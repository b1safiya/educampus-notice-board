import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type NoticeResult = {
    __kind__: "ok";
    ok: Notice;
} | {
    __kind__: "err";
    err: string;
};
export type RegisterResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface LoginRequest {
    username: string;
    password: string;
}
export interface RegisterRequest {
    username: string;
    password: string;
    role: Role;
}
export interface Notice {
    id: NoticeId;
    title: string;
    date: string;
    createdAt: Timestamp;
    createdBy: string;
    description: string;
    category: Category;
    fileUrl: string;
}
export type DeleteResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type LoginResult = {
    __kind__: "ok";
    ok: {
        username: string;
        role: Role;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface UpdateNoticeRequest {
    id: NoticeId;
    title: string;
    date: string;
    description: string;
    category: Category;
    fileUrl: string;
}
export type NoticeId = bigint;
export interface CreateNoticeRequest {
    title: string;
    date: string;
    description: string;
    category: Category;
    fileUrl: string;
}
export enum Category {
    academic = "academic",
    event = "event",
    general = "general",
    sports = "sports"
}
export enum Role {
    admin = "admin",
    student = "student"
}
export interface backendInterface {
    createNotice(req: CreateNoticeRequest, adminUsername: string): Promise<NoticeResult>;
    deleteNotice(id: bigint, adminUsername: string): Promise<DeleteResult>;
    getAllNotices(): Promise<Array<Notice>>;
    getNoticeById(id: bigint): Promise<Notice | null>;
    login(req: LoginRequest): Promise<LoginResult>;
    register(req: RegisterRequest): Promise<RegisterResult>;
    updateNotice(req: UpdateNoticeRequest, adminUsername: string): Promise<NoticeResult>;
}
