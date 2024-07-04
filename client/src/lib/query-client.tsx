import { QueryClient, QueryClientProvider } from 'react-query';


const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchInterval: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,  
        }
    }
})

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
}