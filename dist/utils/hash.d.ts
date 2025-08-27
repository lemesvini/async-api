export declare function hashPassword(password: string): {
    salt: string;
    hash: string;
};
export declare function verifyPassword(candidatePassword: string, salt: string, hash: string): boolean;
//# sourceMappingURL=hash.d.ts.map