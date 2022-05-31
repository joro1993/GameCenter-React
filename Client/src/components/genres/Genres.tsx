import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UrlGenres } from "../../constants/endpoints"
import { Button } from "../utils/Button"
import { GenericList } from "../utils/GenericList"
import { genreDTO } from "./models/Genres.model"
import { Pagination} from '../utils/Pagination'
import { RecordsPerPageSelect } from "../utils/RecordsPerPageSelect"

export const Genres = () => {
    document.title = "Game Center - Genres"
    const [genres, setGenres] = useState<genreDTO[]>();
    const [totalAmountOfPages, setTotalAmountOfpages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(UrlGenres, {
            params: {page, recordsPerPage}
        })
        .then((response: AxiosResponse<genreDTO[]>) => {
            const totalAmountOfRecords = 
                parseInt(response.headers['totalamountofrecords'], 10);
            setTotalAmountOfpages(Math.ceil(totalAmountOfRecords / recordsPerPage));
            setGenres(response.data);
        })
    }, [page, recordsPerPage])

    return(
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create Genre</Link>

            <RecordsPerPageSelect onChange={amountOfRecords => {
                setPage(1);
                setRecordsPerPage(amountOfRecords);
            }}/>

            <Pagination currentPage={page} totalAmountOfPages={totalAmountOfPages} onChange={newPage => setPage(newPage)}/>
            <GenericList list={genres}>
                <table className="table table-stripe">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {genres?.map(genre => 
                        <tr key={genre.id}>
                            <td>
                                <Link className="btn btn-success" 
                                to={`/genres/edit/${genre.id}`}>Edit</Link>

                                <Button className="btn btn-danger">Delete</Button>
                            </td>
                            <td>
                                {genre.name}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </GenericList>
        </>
    )
}