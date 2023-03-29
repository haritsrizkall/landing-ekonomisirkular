import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { questionAPI } from "../../../../api/question";
import questionSetsAPI from "../../../../api/question_set";
import QuestionSetEdit from "../../../../components/modal/edit/question_set_edit";
import Table from "../../../../components/table";

const QuestionSets = () => {
    const { isError, isLoading, data: questionSets, status, error } = useQuery("questionSets", questionSetsAPI.getAll);
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "question_set_id": 1,
        "type": "INDIVIDU",
        "instructions": "Pilihlah jawaban yang paling sesuai dengan diri anda",
        "desctiprion": "Pertanyaan ini mengenai keuangan anda",
    });
    const data = useMemo(
        () => questionSets,
        [questionSets]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'question_set_id',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Instruction',
                accessor: 'instruction',
            }
        ]
    )
    const initialState = {
        hiddenColumns: ['question_set_id'],
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
                      className="bg-blue-400 px-5 py-2 rounded mr-3"
                      onClick={() =>{
                          setEditModal(true);
                          setSelectedData(row.original);
                      }}>
                      Edit
                    </button>
                    <button
                      className="bg-red-400 px-5 py-2 rounded"
                      onClick={() =>{
                          alert("Editing: " + row.values['participant_id'])
                      }}>
                      Delete
                    </button>

                </div>
            ),
          },
        ]);
      };
    const handleDownload = (e) => {
      e.preventDefault()
      setLoadingDownload(true)
      questionSetsAPI.downloadQuestionSet().then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'question_set.xlsx');
        document.body.appendChild(link);
        link.click();
        setLoadingDownload(false)
      })
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <QuestionSetEdit isVisible={editModal} setIsVisible={setEditModal} questionSet={selectedData}/>
            <div className="mx-5 py-10">
                {
                    isError && <div className="bg-red-500 text-white p-3 rounded mb-5 cursor-pointer">Error: {error.message}</div>
                }
            <h1 className="mb-5">Question Set</h1>
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={handleDownload}>Download</button>
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
                {
                    questionSets && (
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

export default QuestionSets