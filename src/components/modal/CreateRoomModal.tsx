import Input from '../layout/form/Input';
import Button from '../layout/form/Button';
import { ChangeEvent, useState } from 'react';
import ClosedModalButton from './ClosedModalButton';
import { createGameRoom } from '../../api/gameRoomApi';

function CreateRoomModal() {
  const [roomInput, setRoomInput] = useState({
    roomName: '',
  });
  const handleCreateRoomOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomInput({ ...roomInput, [name]: value });
  };
  const handleCreateRoomButtonClick = () => {
    console.log('Create Room');
    createGameRoom(roomInput);
  };
  return (
    <div>
      <ClosedModalButton />
      <h2>방 만들기</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>방 제목</label>
          <Input
            type="text"
            name="roomName"
            value={roomInput.roomName}
            onChangeFnc={(e) => handleCreateRoomOnChange(e)}
            placeholder="제목을 입력하세요."
          />
        </div>
        {/* <div>
          <label>비밀번호</label>
          <Input
            type="text"
            value={'ㅇㅇ'}
            onChangeFnc={() => {}}
            placeholder="제목을 입력하세요."
          />
        </div> */}
        <Button onClickFnc={handleCreateRoomButtonClick}>
          <p>방만들기</p>
        </Button>
      </form>
    </div>
  );
}

export default CreateRoomModal;
