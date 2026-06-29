import { BaseService } from '~/shared/services/base.service'

import { AuthEndpoint } from './auth.endpoint'

import type {
    SigninRequest,
    SignupRequest
} from '../types/auth-request'

import type {
    SigninNo2FAResponse,
    SignupResponse,
    ProfileResponse
} from '../types/auth-response'

import type { User } from '../types/user'

class AuthService extends BaseService {

    async signup(payload: SignupRequest) {
        return await this.post<SignupResponse>(
            AuthEndpoint.SIGNUP,
            payload
        )
    }

    async signin(payload: SigninRequest) {
        const response = await this.post<SigninNo2FAResponse>(
            AuthEndpoint.SIGNIN,
            payload
        )

        return response.data
    }

    async profile(): Promise<User> {
        const response = await this.get<ProfileResponse>(
            AuthEndpoint.PROFILE
        )

        return response.data
    }

    async logout() {
        await this.post(
            AuthEndpoint.SIGNOUT
        )
    }

}

export default new AuthService()