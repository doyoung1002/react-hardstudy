import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from 'axios';

const InfiniteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #333;
`;

const InfiniteItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InfiniteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 400px;
  height: 100px;
  padding: 40px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  text-decoration: none;
  position: relative;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  p {
    font-weight: 700;
  }

  .floating {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: #000;
    color: #fff;
    font-weight: 700;
  }
`;

const InfinitePage = () => {
  const obsRef = useRef(null); // observer Element
  const [list, setList] = useState([]); // post List
  const [page, setPage] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(true); // 로딩 스피너
  const endRef = useRef(false); // 모든 글 로드 확인

  // 페이지 변경 시 글 불러오기
  useEffect(() => {
    getPost();
  }, [page]);

  // 옵저버 콜백 함수
  const obsHandler = useCallback((entries) => {
    const target = entries[0];

    if (!endRef.current && target.isIntersecting) {
      setPage((prev) => prev + 1); // 페이지 증가
    }
  }, []);

  // 글 불러오기 함수
  const getPost = useCallback(async () => {
    setLoading(true);

    try {
      const API_KEY = '';

      const response = await axios.get('', {
        params: {
          include_breeds: true,
          format: 'json',
          limit: 5,
          page: page,
          has_breeds: true,
          order: 'ASC',
        },
        headers: {
          'x-api-key': API_KEY,
        },
      });

      const data = response.data;
      const newData = data.map((item) => ({
        url: item.url,
        name: item.breeds[0]?.name,
      }));

      setList((prev) => [...prev, ...newData]);

      if (data.length === 0) {
        endRef.current = true; // 모든 글 로드 확인 (마지막 페이지)
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    let observer;

    // IntersectionObserver 생성
    const createObserver = () => {
      observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });

      if (obsRef.current) {
        observer.observe(obsRef.current);
      }
    };

    createObserver();

    // 컴포넌트가 언마운트될 때 observer 해제
    return () => {
      if (observer && obsRef.current) {
        observer.unobserve(obsRef.current);
        observer.disconnect();
      }
    };
  }, [obsHandler]);

  return (
    <InfiniteContainer>
      <InfiniteItemList>
        {list.map((item, index) => (
          <InfiniteItem key={index}>
            <img src={item.url} alt="Pet" /> {/* 이미지 표시 */}
            {item.name && <p>{item.name}</p>} {/* 종 표시 */}
            <div className="floating">{index + 1}</div> {/* 순서 표시 */}
          </InfiniteItem>
        ))}
      </InfiniteItemList>

      {loading && <div>Loading...</div>}

      <div ref={obsRef}></div> {/* 옵저버 Element */}
    </InfiniteContainer>
  );
};

export default InfinitePage;
