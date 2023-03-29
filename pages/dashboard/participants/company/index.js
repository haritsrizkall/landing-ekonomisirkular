import { useEffect, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useGlobalFilter, useTable } from "react-table"
import { participantAPI } from "../../../../api/participant"
import GlobalFilter from "../../../../components/globalFilter"
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation"
import CompanyDetailModal from "../../../../components/modal/detail/company_detail"
import IndividuDetailModal from "../../../../components/modal/detail/individu_detail"
import Table from "../../../../components/table"

const dataDetail = {
  "participant_id": "ad11d54d-7d00-48b4-91ca-cbc3a383b33e",
			"name": "Luluk",
			"type": "COMPANY",
			"createdAt": "2022-11-01T05:12:44.000Z",
			"updatedAt": "2022-11-01T05:12:44.000Z",
			"company": {
				"company_id": 1,
				"participant_id": "ad11d54d-7d00-48b4-91ca-cbc3a383b33e",
				"age": -1,
				"company_type": "Jasa",
				"industry_type": "Retail",
				"number_employee": 9,
				"revenue_monthly": -3,
				"position": "Manajer",
				"education": "SMA",
				"email": "k",
				"no_hp": "k",
				"createdAt": "2022-11-01T05:12:44.000Z",
				"updatedAt": "2022-11-01T05:12:44.000Z"
			}
}
const ParticipantsCompany = () => {
    const [selectedData, setSelectedData] = useState(dataDetail)
    const [showModal, setShowModal] = useState(false)
    const { isError, isLoading, data: companies, status, error } = useQuery("participants", participantAPI.getCompanies);
    const [loadingDownload, setLoadingDownload] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(participantAPI.deleteParticipant, {
      onSuccess: () => {
        queryClient.invalidateQueries("participants")
      }
    })
    const data = useMemo(
        () => companies,
        [companies]
    )
    const columns = useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'participant_id',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Type',
            accessor: 'type',
          },
          {
            Header: 'Age',
            accessor: 'company.age'
          },
          {
            Header: 'Company Type',
            accessor: 'company.company_type',
          },
          {
            Header: 'Industry Type',
            accessor: 'company.industry_type',
          },
          {
            Header: 'Number Employee',
            accessor: 'company.number_employee',
          },
          {
            Header: 'Email',
            accessor: 'company.email',
          },
          {
            Header: 'Company Type',
            accessor: 'company.no_hp',
          }
        ],
        []
    )
    const initialState = { hiddenColumns: ["participant_id"] };

    const tableHooks = (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "Action",
          Header: "Action",
          Cell: ({ row }) => (
            <div className="flex">
                  <button
                    className="bg-blue-400 px-5 py-2 rounded"
                    onClick={() =>{
                        setSelectedData(row.original);
                        setShowModal(true)
                    }}>
                    Detail
                  </button>
                  <button
                    className="bg-red-500 px-5 py-2 rounded"
                    onClick={() =>{
                        setDeleteModal(true)
                        setSelectedData(row.original)
                    }}>
                    Delete
                  </button>
                </div>
          ),
        },
      ]);
    };
    const handleClose = () => {
      setShowModal(false)
    }
    const handleDownload = (e) => {
      e.preventDefault()
      setLoadingDownload(true)
      participantAPI.downloadCompanies().then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'participants_company.xlsx');
        document.body.appendChild(link);
        link.click();
        setLoadingDownload(false)
      })
    }
  const handleCloseDeleteModal = () => {
      setDeleteModal(false);
  }
  const handleDelete = () => {
      mutationDelete.mutate(selectedData.participant_id);
      setDeleteModal(false);
  }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return(
      <>
        <DeleteConfirmationModal isVisible={deleteModal} handleDelete={handleDelete} handleClose={handleCloseDeleteModal} />
        <CompanyDetailModal isVisible={showModal} data={selectedData} handleClose={handleClose}/>
        <div className="mx-5 py-10">
            <h1 className="mb-5">Participants Company</h1>
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={handleDownload}>Download</button>
            {
              isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
            }
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
            {
              companies && (
                  <Table
                      data={data}
                      columns={columns} 
                      tableHooks={tableHooks}
                      initialState={initialState}
                  />
              )
            }
            </div>
        </div>
      </> 
    )
}

export default ParticipantsCompany