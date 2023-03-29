import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import landingApi from "../../../../api/landing";
import sliderApi from "../../../../api/slider";
import SliderAdd from "../../../../components/modal/add/slider_add";
import DeleteConfirmationModal from "../../../../components/modal/delete_confirmation";
import LandingEdit from "../../../../components/modal/edit/landing_edit";
import SliderEdit from "../../../../components/modal/edit/slider_edit";
import Table from "../../../../components/table";
import { constant } from "../../../../constant";

const Slider = () => {
    const queryClient = useQueryClient();
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        "slider_id": 1,
        "image": "landing1.png",
    });
    const mutationDelete = useMutation(sliderApi.delete, {
        onSuccess: () => {
            queryClient.invalidateQueries("sliders")
        }
    });
    const { isError, isLoading, data: sliders, status, error } = useQuery("sliders", sliderApi.getAll);
    const data = useMemo(
        () => sliders,
        [sliders]
    )
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'slider_id',
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
        hiddenColumns: ['slider_id'],
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
                        <button
                            className="bg-red-400 px-5 py-2 rounded"
                            onClick={() =>{
                                setSelectedData(row.original);
                                setDeleteModal(true);
                            }}>
                            Delete
                        </button>
                    </div>
                ),
            },
        ]);
    }
    const handleDelete = () => {
        mutationDelete.mutate(selectedData.slider_id);
        setDeleteModal(false);
    }
    const handleCloseDeleteModal = () => {
        setDeleteModal(false);
    }
    return (
        <>
        <SliderAdd isVisible={addModal} setIsVisible={setAddModal} slider={selectedData}/>
        <SliderEdit isVisible={editModal} setIsVisible={setEditModal} slider={selectedData}/>
        <DeleteConfirmationModal handleClose={handleCloseDeleteModal} handleDelete={handleDelete} isVisible={deleteModal}/>
        <div className="mx-5 py-10">
            <div className="px-5 py-5 bg-white rounded drop-shadow-lg">
            <button className="bg-blue-500 px-5 py-2 rounded mb-5" onClick={() => setAddModal(true)}>Add Slider</button>
            {
                sliders && (
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
    );
}

export default Slider