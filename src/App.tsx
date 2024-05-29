import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageHeader from "./components/PageHeader";
import MainContent from "./components/MainContent";
import { RecoilRoot } from "recoil";

export default function App() {

	const queryClient = new QueryClient()

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<div className="min-h-screen bg-background flex flex-col">
					<PageHeader />
					<MainContent />
				</div>
			</QueryClientProvider>
		</RecoilRoot>
	)
}