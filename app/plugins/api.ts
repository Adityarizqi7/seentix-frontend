export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: `${config.public.apiBaseUrl}${config.public.apiVersion}`,

        onRequest({ options }) {
            const token = useCookie<string | null>('access_token')

            const headers = new Headers(options.headers)

            headers.set('Accept', 'application/json')

            if (token.value) {
                headers.set('Authorization', `Bearer ${token.value}`)
            }

            options.headers = headers
        },

        onResponse({ response }) {
            return response._data
        },

        onResponseError({ response }) {
            throw response?._data
        }
    })

    return {
        provide: {
            api
        }
    }
})