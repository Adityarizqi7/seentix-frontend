export interface SignupRequest {
    full_name: string
    email: string
    password: string
    password_confirmation: string
}

export interface SigninRequest {
    email: string
    password: string
}