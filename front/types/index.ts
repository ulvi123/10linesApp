export interface task {
    id:string,
    name:string,
    status: "idle" | "in_progress" | "completed"
}

export interface User {
    id:string
    email:string
}