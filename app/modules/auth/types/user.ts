export interface User {
    id: number
    fullName: string
    email: string
    phoneNumber: string
    dateOfBirth: string
    use2Fa: boolean
    emailVerifiedAt: string | null
    createdAt: string
    updatedAt: string
    initials: string
    isEmailVerified: boolean
}