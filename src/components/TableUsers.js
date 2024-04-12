import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';

function TableUsers() {

    const [listUser,setListUser] = useState([])
    const [totalUser,setTotalUser] = useState(0)
    const [totalPage,setTotalPage] = useState(0)
    useEffect(() => {
        // call api
        getUsers(1)
    },[])
    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if(res && res.data) {
            setListUser(res.data)
            setTotalUser(res.total)
            setTotalPage(res.total_pages)
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected+1)
    }
  return (
    <>
    <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>EMail</th>
                <th>First Name</th>
                <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length >0 && 
                    listUser.map((user,index)=> {
                        return(
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                            </tr>
                        )
                })}
                
            </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
    />
    </>
  );
}

export default TableUsers;