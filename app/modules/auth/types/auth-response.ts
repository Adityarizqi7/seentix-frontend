import type { User } from './user'

export interface SignupResponse {
    data: {
        user: User,
        token: string
    }
}

export interface SigninNo2FAResponse {
    data: {
        user: User,
        token: string
    }
}

export interface SigninWith2FAResponse {
    data: {
        requiresTwoFactor: boolean,
        twoFactorToken: string
    }
}

export interface ProfileResponse {
    data: User
}