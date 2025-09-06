import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../../utils/prisma";

interface DashboardStats {
  totalStudents: number;
  totalConsultants: number;
  totalContents: number;
  totalClasses: number;
  activeClasses: number;
  totalEnrollments: number;
  recentEnrollments: number;
  attendanceRate: number;
  totalRevenue: number;
  monthlyRevenue: number;
  paidPayments: number;
  pendingPayments: number;
  overduePayments: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    date: Date;
  }>;
}

export async function getDashboardStats(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Get counts
    const [
      totalStudents,
      totalConsultants,
      totalContents,
      totalClasses,
      activeClasses,
      totalEnrollments,
      recentEnrollments,
      attendanceStats,
      paymentStats,
      recentPayments,
      recentClassEnrollments,
    ] = await Promise.all([
      // Total students
      prisma.user.count({
        where: { role: "STUDENT" },
      }),

      // Total consultants
      prisma.user.count({
        where: { role: "CONSULTANT" },
      }),

      // Total contents
      prisma.content.count({
        where: { isActive: true },
      }),

      // Total classes
      prisma.class.count(),

      // Active classes
      prisma.class.count({
        where: { isActive: true },
      }),

      // Total enrollments
      prisma.classEnrollment.count({
        where: { isActive: true },
      }),

      // Recent enrollments (last 7 days)
      prisma.classEnrollment.count({
        where: {
          isActive: true,
          enrolledAt: {
            gte: lastWeek,
          },
        },
      }),

      // Attendance statistics
      prisma.attendance.aggregate({
        _count: {
          _all: true,
        },
        where: {
          status: "PRESENT",
        },
      }),

      // Payment statistics
      prisma.payment.groupBy({
        by: ["status"],
        _count: {
          _all: true,
        },
        _sum: {
          amount: true,
        },
      }),

      // Recent payments for activity
      prisma.payment.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          student: {
            select: {
              fullName: true,
            },
          },
        },
      }),

      // Recent class enrollments for activity
      prisma.classEnrollment.findMany({
        take: 5,
        orderBy: {
          enrolledAt: "desc",
        },
        include: {
          student: {
            select: {
              fullName: true,
            },
          },
          class: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    // Calculate attendance rate
    const totalAttendanceRecords = await prisma.attendance.count();
    const presentAttendance = attendanceStats._count._all || 0;
    const attendanceRate =
      totalAttendanceRecords > 0
        ? Math.round((presentAttendance / totalAttendanceRecords) * 100)
        : 0;

    // Process payment statistics
    let totalRevenue = 0;
    let monthlyRevenue = 0;
    let paidPayments = 0;
    let pendingPayments = 0;
    let overduePayments = 0;

    paymentStats.forEach((stat) => {
      const count = stat._count._all;
      const sum = Number(stat._sum.amount) || 0;

      switch (stat.status) {
        case "PAID":
          paidPayments = count;
          totalRevenue += sum;
          break;
        case "PENDING":
          pendingPayments = count;
          break;
        case "OVERDUE":
          overduePayments = count;
          break;
      }
    });

    // Get monthly revenue for current month
    const currentMonthPayments = await prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: "PAID",
        referenceMonth: currentMonth,
        referenceYear: currentYear,
      },
    });

    monthlyRevenue = Number(currentMonthPayments._sum.amount) || 0;

    // Build recent activity
    const recentActivity = [
      ...recentPayments.map((payment) => ({
        id: payment.id,
        type: "payment",
        description: `Payment of $${payment.amount} from ${payment.student.fullName}`,
        date: payment.createdAt,
      })),
      ...recentClassEnrollments.map((enrollment) => ({
        id: enrollment.id,
        type: "enrollment",
        description: `${enrollment.student.fullName} enrolled in ${enrollment.class.name}`,
        date: enrollment.enrolledAt,
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);

    const stats: DashboardStats = {
      totalStudents,
      totalConsultants,
      totalContents,
      totalClasses,
      activeClasses,
      totalEnrollments,
      recentEnrollments,
      attendanceRate,
      totalRevenue,
      monthlyRevenue,
      paidPayments,
      pendingPayments,
      overduePayments,
      recentActivity,
    };

    return reply.send(stats);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return reply.status(500).send({
      error: "Internal Server Error",
      message: "Failed to fetch dashboard statistics",
    });
  }
}
