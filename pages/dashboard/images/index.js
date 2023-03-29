import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import ImageAPI from "../../../api/image";
import ImageEdit from "../../../components/modal/edit/image_edit";
import Table from "../../../components/table";
import { constant } from "../../../constant";

const Images = () => {
    const queryClient = useQueryClient();
    const { isError, isLoading, data: images, status, error } = useQuery("images", ImageAPI.getAll);
    const [editModal, setEditModal] = useState(false)
    const [selectedData, setSelectedData] = useState({
        "image_id": 1,
        "image": "landing1.png",
        "name": "landing1.png",
        "position": "landing1.png",
    });
    const data = useMemo(
        () => images,
        [images]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'image_id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Image',
                Cell: ({ row }) => (
                    <img src={`${constant.backendURL}/${row.original.image}`} alt="slider" className="w-20"/>
                )
            },
        ],
    )

    const initialState = {
        hiddenColumns: ['image_id'],
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
                id: 'action',
                Header: 'Action',
                Cell: ({ row }) => (
                    <div className="flex">
                        <button
                          className="bg-blue-400 px-5 py-2 rounded mr-3"
                          onClick={() =>{
                            setEditModal(true);
                            setSelectedData(row.original)
                          }}>
                          Edit
                        </button>
                    </div>
                ),
            },
        ]);
    }

    return (
        <>
        <ImageEdit
            isVisible={editModal}
            setIsVisible={setEditModal}
            selectedData={selectedData}
        />
        <div className="mx-5 py-10">
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Slider</button>
            {
                images && (
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

export default Images
