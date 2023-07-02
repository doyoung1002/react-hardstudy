import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchDiv = styled.div`
  background-color: #e2dee5;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #353238;
    font-size: 1rem;
    line-height: 1;
    margin: 0;
    min-height: 100%;
    display: block;
    height: 3700px;
`;


const SearchSection = styled.div`
    color: #353238;
    font-size: 1rem;
    line-height: 1;
    -webkit-text-size-adjust: 100%;
    margin: 0%;
  `;
const SearchPaddingGlobal = styled.div`
    padding-right: 1rem;
    padding-left: 1rem;
    display: block;
    padding: 0px;
    margin: 0;
  `;

const SearchContainer = styled.div`
    width: 100%;
    height: 3700px;
    max-width: 40rem;
    margin-right: auto;
    margin-left: auto;
    
    
  `;

const SearchPaddingVertical = styled.div`
    padding-top: 2rem;
    padding-bottom: 2rem;
    
h1 {
  margin-top: 0px;
    margin-bottom: 2rem;
    color: #1a1a1a;
    font-size: 4rem;
    font-weight: 800;
    line-height: 44px;
    margin: 0.67em 0;
    display: block;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px
  
}
.searchBar {
  margin-bottom: 1rem;
  margin: 0 0 15px;
  position: relative;
  font-size: 1.5rem;
    color: rgb(116, 116, 116);
    width: 400px;
    height: 60px;

}
`;

const SearchList = styled.div`
    .SearchItem {
      width: 600px;
    height: 122px;;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #f1f3f4;
    box-sizing: border-box;
    display: block;
    
    
    }
`;

const SearchPage = () => {
  const [searchText, setSearchText] = useState(''); // 검색어 입력 상태 관리
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 관리

  const handleSearch = async (e) => {
    e.preventDefault(); // 새로고침 방지

    const searchAPI = async (query) => {
      const headers = {
        Authorization: `키값`, // 카카오 Developers에서 발급받은 API
        // 환경 변수 숨겨야 됨
      };
      // api 분산
      try {
        const response = await axios.get('url', {
          headers,
          params: {
            query,
          },
        });
        return response.data;
      } catch (error) {
        throw new Error('Error searching:', error);
      }

    };

    try {
      const response = await searchAPI(searchText); // 검색 API 호출
      if (response && response.documents) {
        setSearchResults(response.documents); // 검색 결과 업데이트
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };




  return (
    <SearchDiv>
      <SearchSection>
        <SearchPaddingGlobal>
          <SearchContainer>
            <SearchPaddingVertical>
              <h1>Posts</h1>
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  className="searchBar"
                  placeholder="Search"
                  value={searchText} // 검색어 입력 값 바인딩
                  onChange={(e) => setSearchText(e.target.value)} // 검색어 변경 핸들러
                />

              </form>
            </SearchPaddingVertical>
            <SearchList>
              {searchResults.map((item, index) => (
                <div className="SearchItem" key={index}>
                  {/* 검색 결과에서 <b> 태그를 제거하기 위해 replace 함수를 사용. */}
                  {item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: '#888888',
                      cursor: 'pointer',
                      float: 'right',
                      textDecoration: 'none' // 링크의 밑줄 제거
                    }}
                    onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 막기
                  >
                    {/* 해당 링크의 목적지 url을 item.url로 설정 / 새탭 / 보안 */}
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
                      color: '#88888',
                      textDecoration: 'none'
                    }}>
                      궁금하면 여기 클릭🔥
                    </a>
                  </span>
                </div>
              ))}
            </SearchList>
          </SearchContainer>
        </SearchPaddingGlobal>
      </SearchSection>
    </SearchDiv >
  );
};

export default SearchPage;