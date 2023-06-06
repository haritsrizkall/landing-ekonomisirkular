import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import answersAPI from "../../../../api/answer";
import scoreAPI from "../../../../api/score";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import ScoreDetailModal from "../../../../components/modal/detail/score_detail";
import Table from "../../../../components/table";

const ScoresCompany = () => {
    const [detailModal, setDetailModal] = useState(false);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [selectedData, setSelectedData] = useState();
    const [deleteModal, setDeleteModal] = useState(false)
    const { isError, isLoading, data: scores, status, error } = useQuery("scoresCompany", scoreAPI.getCompanyScores);
    const queryClient = useQueryClient();
    const mutationDelete = useMutation(scoreAPI.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("scoresCompany")
        }
    })
    const data = useMemo(
        () => scores,
        [scores]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'score_id',
            }, 
            {
                Header: 'Type',
                accessor: 'participant.type'
            },
            {
                Header: 'Name',
                accessor: 'participant.name',
            },
            {
                Header: 'Grade',
                accessor: "grade",
                Cell: ({ row }) => Math.round(row.original.grade)
            }
        ]
    )
    const initialState = {
        hiddenColumns: ['score_id'],
    }
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
            {
                id: 'No',
                Header: 'No',
                accessor: 'index',
                Cell: ({ row }) => row.index + 1,
            },
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
                          setDetailModal(true);
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
    }
    const handleDownload = (e) => {
        e.preventDefault();
        setLoadingDownload(true)
        scoreAPI.downloadScoresCompany().then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'scores_company.xlsx');
            document.body.appendChild(link);
            link.click();
            setLoadingDownload(false)
        });
    }
    const handleDownloadRecap = (e) => {
        e.preventDefault();
        setLoadingDownload(true)
        answersAPI.downloadRecapAnswer("company").then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `recap_answer_company.xlsx`);
            document.body.appendChild(link);
            link.click();
            setLoadingDownload(false)
        });
    }
    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
        setEditModal(false);
    }
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.score_id);
        setDeleteModal(false);
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <DeleteConfirmationModal isVisible={deleteModal} handleDelete={handleDelete} handleClose={handleCloseDeleteModal} />
            <ScoreDetailModal 
                isVisible={detailModal}
                setIsVisible={setDetailModal}
                score={selectedData}
            />
            <div className="mx-5 py-10">
                <button className="bg-blue-500 px-5 py-2 rounded mb-5 mx-2" onClick={handleDownload}>Download</button>
                <button className="bg-blue-500 px-5 py-2 rounded mb-5 mx-2" onClick={handleDownloadRecap}>Download Recap Answer</button>
                {
                    isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
                }
                <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                    {
                        scores && (
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

export default ScoresCompany