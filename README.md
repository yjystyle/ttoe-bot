# tteo

## 개요

## 기능
1. 스케쥴러
    - 일정 시간이 되면 해당 채널에 메시지를 보내서 게임 가능 여부를 체크한다.
    - 해당 스케쥴러의 시간은 동적 변경이 가능해야 한다.
2. 메시지 전송 및 응답 처리
    - 스케쥴러를 통해 보내진 메시지에서 가능 여부를 체크할 수 있게 한다.
    - 리턴된 값을 바탕으로 해당 길드 유저의 상태를 변경처리
    - 메시지 응답 완료시에는 모든 길드 유저들에게 현재 게임 가능 여부를 브로드캐스트한다.