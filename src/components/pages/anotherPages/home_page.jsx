import React, { useEffect, useState,useRef } from "react";
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import { BiSolidCategory } from "react-icons/bi";

import LoadingPage from "../../features/loading.component";
import VideoThumbnail from "../../features/video/video_thumbnail.component"; 

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Carousel from "react-multi-carousel";

import '../scss/home.scss'
import "react-multi-carousel/lib/styles.css";

const Home = ({handleToggleSideBar})=>{
    let TimeOut;
    const [loading,setLoading]=useState(true);

    const [pagination,setPagination]=useState(0)
    const [data,setData]=useState(null)
    const [categories,setCategories]=useState([])
    const [categoryId,setCategoryId]=useState(-1)
    const [hasMore,setHasMore]=useState(true)
    
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 6,
            slidesToSlide: 2 
        },
        tablet: {
            breakpoint: { max: 1200, min: 700 },
            items: 4,
            slidesToSlide: 1 
        },
        mobile: {
            breakpoint: { max: 700, min: 0 },
            items: 2,
            slidesToSlide: 1 
        }
        };

    useEffect(()=>{
        async function fetchData() {
        var query=`/api/get-videos-home?pagination=${pagination}&number=6`
        if(categoryId!=-1)
            query+=`&categoryId=${categoryId}`

        await axios.get(query)
        .then(res=>{setData(res.data.videosWithChannel);
                    if(res.data.videosWithChannel.length==0){
                        setHasMore(false)}
                    })
        .catch(error=>console.error("Error:",error))

        await axios.get(`/api/get-categories`)
        .then(res=>{setCategories(res.data.data)})
        .catch(error=>console.error("Error:",error))
        }
        fetchData();

            


    },[categoryId])

    const handleClickCategory=(id)=>{
        setPagination(0)
        setHasMore(true)
        if(id==categoryId)
            setCategoryId(-1);
        else
            setCategoryId(id);
    }
   const handleMoreData=()=>{
        setPagination(prev=>prev+1)
        var query=`/api/get-videos-home?pagination=${pagination+1}&number=6`
            if(categoryId!=-1)
                query+=`&categoryId=${categoryId}`
        axios.get(query)
        .then(res=>{
            if(res.data.videosWithChannel.length==0){
                setHasMore(false)}
                clearTimeout(TimeOut);
                TimeOut=setTimeout(() => {
                     setData(data.concat(res.data.videosWithChannel))
                    
                }, 500);
            })
        .catch(error=>console.error("Error:",error))
   }

    return(
        <div className="media-container">
            <div className="home-screen">
                <div className="category-carousel">
                    <div className="title">
                        <BiSolidCategory size={30}/><span>Categories</span>
                    </div>
                    <div className="carousel">
                        <Carousel  responsive={responsive} containerClass="carousel-container d-flex flex-row" infinite={true}>
                            {
                                categories.map((item,index)=>(
                                            <div key={index} className={categoryId==item._id?`active item`:"item"} onClick={()=>handleClickCategory(item._id)}>
                                                {item.title}
                                            </div>
                                ))
                            }
                        </Carousel>

                    </div>
                </div>
                <div className="videos-section">
                            {data
                                ?<InfiniteScroll dataLength={data.length} className="" next={handleMoreData} hasMore={hasMore} loader={<LoadingPage/>}>
                                    <Row>    
                                        {data.map((item,index)=>(
                                        <Col md={6} xl={4} key={index}>
                                            <Link to={`/video/${item._id}`} style={{ textDecoration: 'none' }}>
                                                            <VideoThumbnail videoInfo={item}/>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </InfiniteScroll>
                                :<>
                                    <div className="cant-find-container d-flex flex-row justify-content-center align-items-center">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <h2 className="text-center">We apologize for the inconvenience</h2>
                                            <h2 className="text-center">The website's back-end has been stopped because AWS continued to bill me even though it was not being used.</h2>
                                            <h2 className="text-center">If you are interested in learning more about the website, please visit my portfolio here:</h2>
                                            <a href="https://namkio12g.github.io/portfolio/inspired.html">My Portfolio</a>
                                        </div>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(Home)

