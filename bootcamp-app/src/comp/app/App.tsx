import {useState} from 'react'
import Main from '../main/Main';
import BoardList from '../board/BoardList';
import Notice from '../notice/Notice';
import QnA from '../qna/QnA';
import {Link, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import FAQ from "../faq/FAQ";
import NewPost from "../board/NewPost";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import PostDetail from "../board/PostDetail";

function App() {

    return (
        <>
            <div className="container">
                <header
                    className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/"
                       className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                            BootCamp
                    </a>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                        <li><Link to="/board" className="nav-link px-2 link-dark">Board</Link></li>
                        <li><Link to="/qna" className="nav-link px-2 link-dark">QnA</Link></li>
                        <li><Link to="/faq" className="nav-link px-2 link-dark">FAQ</Link></li>
                        <li><Link to="/notice" className="nav-link px-2 link-dark">Notice</Link></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        <Link to="/login" className="btn btn-outline-primary me-2" role="button">Login</Link>
                        <Link to="/signup" className="btn btn-primary me-2" role="button">Sign-up</Link>
                    </div>
                </header>
            </div>

            <div className="container">
            <div className='cardContainer'>
            <Container fluid className="px-3 py-2">
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/board/newpost" element={<NewPost />}></Route>
                <Route path="/board/*" element={<PostDetail />}></Route>
                <Route path="/board" element={<BoardList />}></Route>
                <Route path="/qna" element={<QnA />}></Route>
                <Route path="/faq" element={<FAQ />}></Route>
                <Route path="/notice" element={<Notice />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
            </Container>
            </div>
            </div>

                <div className="container">
                    <footer className="py-3 my-4">
                        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                            <li><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
                            <li><Link to="/board" className="nav-link px-2 text-muted">Board</Link></li>
                            <li><Link to="/qna" className="nav-link px-2 text-muted">QnA</Link></li>
                            <li><Link to="/faq" className="nav-link px-2 text-muted">FAQ</Link></li>
                            <li><Link to="/notice" className="nav-link px-2 text-muted">Notice</Link></li>
                        </ul>
                        <p className="text-center text-muted">© 2022 Company, Inc</p>
                    </footer>
                </div>
        </>
    )
}

export default App
