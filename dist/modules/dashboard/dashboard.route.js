"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dashboardRoutes;
const dashboard_controller_1 = require("./dashboard.controller");
async function dashboardRoutes(app) {
    app.get("/stats", {
        preHandler: [app.authenticate],
        handler: dashboard_controller_1.getDashboardStats,
    });
}
//# sourceMappingURL=dashboard.route.js.map