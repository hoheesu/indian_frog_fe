# ⛵INDIAN_FROG

> ️항해99 6조 실전 프로젝트

## ✍🏻 서비스 소개

> 자신의 카드를 모른 채 상대와 심리전을 통해 승패를 가리는 인디언 포커 게임을 웹서비스로!

| ✨ **대표 스택** | `React` `Spring`                         |
| ---------------- | :--------------------------------------- |
| 🚩 **개발 기간** | 2024.03.26 ~ 2023.05.07                  |
| ➡️ **URL**       | [인디안 개구리](https://indianfrog.com/) |

## 🐬 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/Rosa-Eau"><img src="https://avatars.githubusercontent.com/u/78130010?v=4" width="150px;" /></a></td>
      <td align="center"><a href="https://github.com/hoheesu"><img src="https://avatars.githubusercontent.com/u/99115509?v=4" width="150px;" /></a></td>
      <td align="center"><a href="https://github.com/holynow"><img src="https://avatars.githubusercontent.com/u/36294761?v=4" width="150px;" /></a></td>
      <td align="center"><a href="https://github.com/lsc713"><img src="https://avatars.githubusercontent.com/u/139448668?v=4" width="150px;" /></a></td>
      <td align="center"><a href="https://github.com/eleunadeu"><img src="https://avatars.githubusercontent.com/u/121149088?v=4" width="150px;" /></a></td>
      <td align="center"><a href="https://github.com/kjs4231"><img src="https://avatars.githubusercontent.com/u/103157574?v=4" width="150px;" /></a></td>
      <td align="center"><img src="https://ca.slack-edge.com/T01L2TNGW3T-U06RQUMLS2C-7723fe8db2c4-512" width="150px;" /></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/Rosa-Eau">오진선</a></td>
      <td align="center"><a href="https://github.com/hoheesu">윤준수</a></td>
      <td align="center"><a href="https://github.com/holynow">함석원</a></td>
      <td align="center"><a href="https://github.com/lsc713">이주호</a></td>
      <td align="center"><a href="https://github.com/eleunadeu">박용운</a></td>
      <td align="center"><a href="https://github.com/kjs4231">강주성</a></td>
      <td align="center">김지우</td>
    </tr>
    <tr>
      <td align="center">BE / 팀리더</td>
      <td align="center">FE / 부리더</td>
      <td align="center">FE</td>
      <td align="center">BE</td>
      <td align="center">BE</td>
      <td align="center">BE</td>
      <td align="center">UI/UX</td>
    </tr>
  </tbody>
</table>

## 🏛️ 아키텍처 구성도 <br>
![아키텍쳐](https://github.com/user-attachments/assets/189d4b9a-a0de-43b6-a99e-8e64b0059ca9)




### 🐥 FRONT-END STACK

<div align="center" > 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/React Router v6-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> 
<img src="https://img.shields.io/badge/zustand-FFFFFF?style=for-the-badge&logo=zustand&logoColor=black"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white">
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Sock-000000?style=for-the-badge&logo=&logoColor=white"/>
<img src="https://img.shields.io/badge/Stomp-000000?style=for-the-badge&logo=&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</div>

## 🔎 주요기능

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 로그인 / 회원가입</summary>
 <img style="width: 500px; display: block; margin: 0 auto;" alt="로그인" src="https://github.com/user-attachments/assets/8809377a-3bfc-4823-ac9a-1288700f419d">

- 실시간 통신(websoket)을 이용하여 아래 게임로직을 구현
- 입장한 2명의 플레이어가 모두 READY를 한 경우 게임이 시작된다.
- 포인트가 적은 플레이어의 10%에 해당하는 포인트를 초기 베팅금액으로 게임을 시작한다.
- 방장이 먼저 플레이를 시작하며 방장의 턴이 끝나면 다른 플레이어의 턴이 시작된다.
- 플레이어들은 Die, Check, Raise를 선택하여 베팅하고 Raise의 경우 금액을 입력할 수 있다.
- 모든 베팅이 끝나면 플레이어들은 자기의 패를 확인할 수 있다.
- 라운드가 끝나면 해당 라운드의 승패와 획득 포인트를 확인할 수 있다.
- 플레이어들은 3라운드까지 게임을 진행한다.
- 모든 라운드가 종료되면 승패가 정해지고 플레이어들의 총 획득 포인트를 확인할 수 있다.
- 게임이 끝나면 플레이어들은 재게임을 할지 게임방에서 나갈지 선택할 수 있다.
</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 게임 로비</summary>

<img style="width: 500px; display: block; margin: 0 auto;" alt="로비" src="https://github.com/user-attachments/assets/0df38007-b87c-49c6-889d-062f9bfd5097">

- 게임방에 참여한 플레이어는 게임을 진행하며 채팅을 할 수 있다.
- 채팅에는 게임 중 어떤 요청을 보냈는지 (체크, 레이즈, 다이)에 대한 정보도 표시된다.
- 3분에 한 번씩 자동으로 게임이용을 위한 안내가 올라온다.
- 욕설을 입력할 경우 “(개굴)”로 필터링 된다.
</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 인디언 포커 게임</summary>
<img style="width: 500px; display: block; margin: 0 auto;" alt="게임" src="https://github.com/user-attachments/assets/a30249b0-efc2-4765-a8c6-fab5ef235325">


- 실시간 통신(websoket)을 이용하여 아래 게임로직을 구현
- 입장한 2명의 플레이어가 모두 READY를 한 경우 게임이 시작된다.
- 포인트가 적은 플레이어의 10%에 해당하는 포인트를 초기 베팅금액으로 게임을 시작한다.
- 방장이 먼저 플레이를 시작하며 방장의 턴이 끝나면 다른 플레이어의 턴이 시작된다.
- 플레이어들은 Die, Check, Raise를 선택하여 베팅하고 Raise의 경우 금액을 입력할 수 있다.
- 모든 베팅이 끝나면 플레이어들은 자기의 패를 확인할 수 있다.
- 라운드가 끝나면 해당 라운드의 승패와 획득 포인트를 확인할 수 있다.
- 플레이어들은 3라운드까지 게임을 진행한다.
- 모든 라운드가 종료되면 승패가 정해지고 플레이어들의 총 획득 포인트를 확인할 수 있다.
- 게임이 끝나면 플레이어들은 재게임을 할지 게임방에서 나갈지 선택할 수 있다.
</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 게임방 채팅</summary>
<img style="width: 500px; display: block; margin: 0 auto;" alt="게임" src="https://github.com/user-attachments/assets/6dd85b48-c932-4196-997d-6b27a069ad04">

- 게임방에 참여한 플레이어는 게임을 진행하며 채팅을 할 수 있다.
- 채팅에는 게임 중 어떤 요청을 보냈는지 (체크, 레이즈, 다이)에 대한 정보도 표시된다.
- 3분에 한 번씩 자동으로 게임이용을 위한 안내가 올라온다.
- 욕설을 입력할 경우 “(개굴)”로 필터링 된다.
</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 마이 페이지</summary>
 <img style="width: 500px; display: block; margin: 0 auto;" src="https://github.com/user-attachments/assets/386e405d-6c10-483c-bc8a-8fc4e06b63dc">

- 프로필 및 개인 랭킹을 확인할 수 있다.
- 프로필 편집으로 프로필 이미지를 변경할 수 있다.
- 비밀번호를 변경할 수 있다.
- 30 포인트 이하 시 랜덤 뽑기를 통해 포인트를 충전할 수 있다.
</details>

## 🔑 트러블 슈팅

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 동시성 문제</summary>

- 문제 1: DB상 기존 방에 유저가 남아있는 문제
- 문제 2: 게임방에서 뒤로가기로 나와도 계속 웹소켓이 연결되어있어 다른방에 들어가도 기존 방과 연결이 끊기지 않음. - 원인: useEffect의 의존성 배열을 비워 첫번째 마운트, 언마운트 상황에 대처하는 코드를 작성했으나 첫번째 마운트 될때에는 웹소켓에 connect가 되지 않아 leave 요청을 보낼 수 없어 에러가 발생
  또한 returnValue는 공식문서에서 사용하지 않는것을 권장하고 있는 속성

```js
useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (confirmNavigation) {
      const message =
      "이 페이지를 떠나시겠습니까? 변경 사항이 저장되지 않을 수 있습니다.";
      event.returnValue = message;
      return message;
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    handleLeaveButtonClick();
  };
}, []);
```

- 해결방법: 라이브러리를 사용하여 returnValue를 사용하지 않을 수 있었고, 의존성 배열에 connect를 넣어 뒤로가기 이벤트가 발생하면 서버에 나가는 요청을 보낸후 연결되어있던 웹소켓까지 연결을 끊음


```js
useEffect(() => {
  const listenBackEvent = () => {
    stompClient.send(
      `/app/${gameId}/leave`,
      { Authorization: authToken },
      JSON.stringify({ sender: userInfoDecode.nickname })
    );
    stompClient.disconnect();
  };

  const unlistenHistoryEvent = history.listen(({ action }) => {
    if (action === "POP") {
      listenBackEvent();
      navigate("/main");
    }
  });

  return unlistenHistoryEvent;
}, [connect]);
```

</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 실시간 리스트업</summary>
  
  - 문제 : 로비에서 게임룸을 생성할 경우와 룸에서 퇴장할경우 로비의 리스트 목록이 생성되고 삭제 되는 것이 실시간으로 리스트업 되어야 하는데 새로고침을 눌러야만 최신화가 되는 문제
  - 해결 1) : 리액트 쿼리의 [queryClient.in](http://queryclient.in/)validateQueries 로 쿼리키를 무효화해서 쿼리의 최신데이터를 서버로 부터 다시 가져오게 하여 진행.
  - **BUT**  방에서 나왔을때 본인화면에서는 최신화가 되었지만 다른 브라우저에 동시접속해 있는 화면에서는 그대로 남아있는 문제발생.
  - 해결 2) : 게임룸 리스트를 불러오고 있는 useInfiniteQuery 에 1초마다 Api 호출을 해주는  refetchInterval : 1000 을 추가하여 실시간 리스트업 문제를 해결.

</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 빌드할 경우 이미지 누락</summary>

- 문제 : import 해서 가져온 이미지를 styled-component의 background-image의 사용할경우 로컬서버에서는 정상적으로 보이는 이미지들이 배포서버에서는 누락되는 문제.
- 개선방안 : 현재 폴더구조를 src > assets > images 에 모든 이미지를 담고있는데 빌드시 이미지 경우는 public 폴더에 위치해야 이미지가 누락되지 않는다고 한다.

</details>

## 👨🏻‍🔧 유저테스트 피드백 이후 수정 사항

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ RAISE포인트 관련 문제</summary>

- 문제 : 유저가 상대방의 올인을 유도하여 RAISE를 할 경우 상대 유저는 포인트가 빠져나가지 않은 상황이라 다시 RAISE를 하는 경우 배팅 할 수 있는 최대 금액이 현재 포인트에 맞춰서 계산이 되기때문에 포인트가 두배로 배팅되는 경우가 발생됨.
- 해결 : 유저가 갖고있는 포인트와 직전 RAISE금액을 비교하여 maxBetPoint를 수정하여 Input에 props로 내림.

  ```js
  const raiseMaxBet = (useRef < number) | (null > null);
  const maxBetPoint = useMemo(() => {
    const usersPoint = Math.min(userPoint, otherPoint);
    return raiseMaxBet.current !== null
      ? Math.min(usersPoint, raiseMaxBet.current)
      : userPoint;
  }, [userPoint, otherPoint, raiseMaxBet]);

  // 전체 메세지 받은 리시브함수 내부
  if (message.previousPlayer !== userInfoDecode.nickname) {
    raiseMaxBet.current = message.otherPoint - message.nowBet;
  }
  ```

</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 에러 핸들링</summary>

- 문제: 에러핸들링이 미흡한 부분들이 존재하여 유저에게 좋지 못한 UX를 제공
  </br>ex) 존재하지 않는방 접속, 없는 방 번호 입력, 상대가 나갔다 들어올때 유저 정보 등

- 해결: react-Query → onError상황에서 에러 핸들링을 해주고, 여러 경우의 수를 생각하여 게임방page 렌더시에 유저를 판별하는 부분을 더 추가하였음.

  ```js
  useEffect(() => {
    if (userInfoDecode.nickname !== leaveNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setOtherNickname('');
        setOtherPoint(0);
      }
    }
    if (userInfoDecode.nickname === joinNickname) {
      if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
        setUserType('host');
        setUserPoint(roomUserInfo?.hostPoints);
        setUserImg(roomUserInfo?.hostImageUrl);
        if (roomUserInfo?.participantCount === 2) {
          setOtherNickname(roomUserInfo?.participantNickname);
          setOtherPoint(roomUserInfo?.participantPoints);
          setOtherImg(roomUserInfo?.participantImageUrl);
        }
      }
      if (userInfoDecode.nickname === roomUserInfo?.participantNickname) {
        setUserType('guest');
        setUserPoint(roomUserInfo?.participantPoints);
        setUserImg(roomUserInfo?.participantImageUrl);
        setOtherNickname(roomUserInfo?.hostNickname);
        setOtherPoint(roomUserInfo?.hostPoints);
        setOtherImg(roomUserInfo?.hostImageUrl);
      }
    } else {
      if (roomUserInfo?.participantCount === 2) {
        if (userInfoDecode.nickname === roomUserInfo?.hostNickname) {
          setUserType('host');
          setUserPoint(roomUserInfo?.hostPoints);
          setUserImg(roomUserInfo?.hostImageUrl);
          setOtherNickname(roomUserInfo?.participantNickname);
          setOtherPoint(roomUserInfo?.participantPoints);
          setOtherImg(roomUserInfo?.participantImageUrl);
          if (userInfoDecode.nickname === roomUserInfo?.participantNickname) {
            setUserType('guest');
            setUserPoint(roomUserInfo?.participantPoints);
            setUserImg(roomUserInfo?.participantImageUrl);
            setOtherNickname(roomUserInfo?.hostNickname);
            setOtherPoint(roomUserInfo?.hostPoints);
            setOtherImg(roomUserInfo?.hostImageUrl);
          }
        }
      }
    }
  }, [roomUserInfo]);
  ```

</details>

<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 해상도 마다 게임화면이 잘리거나 안보이는 문제</summary>
- 미디어쿼리를 이용해 해상도에 맞춰 반응형으로 변화되도록 개선
</details>
<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 회원가입시 소셜로그인이 없어서 불편한 문제</summary>
- 구글, 카카오를  통한 소셜 로그인 추가 구현 (oauth2)
</details>
<details>
 <summary style="font-weight: bold; font-size: 18px;">✅ 게임을하다가 방을 퇴장해도 방이 사라지지않는 문제</summary>
- 인증번호가 확인이 안되면 회원가입버튼을 비활성화시켜 회원가입을 할수 없도록 수정
</details>

<img style="width: 500px; display: block; margin: 0 auto;" alt="로비" src="https://github.com/user-attachments/assets/3474fb09-7470-4f64-8482-2de36669e168">
<img style="width: 500px; display: block; margin: 0 auto;" alt="로비" src="https://github.com/user-attachments/assets/4ed1cc6f-6c8d-450e-9f8b-c5e61029c0ad">
