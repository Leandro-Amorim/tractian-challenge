import { useQuery } from '@tanstack/react-query';
import CompanyButton from './buttons/CompanyButton';
import fetchAPI from '../lib/fetchAPI';
import { APICompany } from '../types/API';
import { useRecoilState } from 'recoil';
import { selectedCompanyState } from '../lib/atoms';
import { useEffect } from 'react';

export default function PageHeader() {

	const { data: companies, isError } = useQuery({
		queryKey: ['companies'],
		queryFn: () => { return fetchAPI<APICompany[]>('/companies') },
	});

	const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyState);

	useEffect(() => {
		if (companies && companies.length > 0 && selectedCompany.id === '') {
			setSelectedCompany({
				id: companies[0].id,
				name: companies[0].name
			});
		}
	}, [companies, selectedCompany.id, setSelectedCompany]);

	return (
		<header className="bg-header h-14 p-3 flex items-center justify-between">

			<img src={'./tractian.svg'} alt="Tractian logo" className='h-5 aspect-auto hidden sm:block' />

			<div className='flex items-center gap-2 grow justify-end'>
				{
					isError ?
						<p className='text-red-500 font-semibold'>Network error - please try again later</p>
						:
						companies?.map((company) => {
							return (
								<CompanyButton key={company.id} name={company.name} selected={company.id === selectedCompany.id} onClick={() => setSelectedCompany({ id: company.id, name: company.name })} />
							)
						})
				}
			</div>
		</header>
	)
}