import Input from '../layout/form/Input';
import Button from '../layout/form/Button';

function CreateRoomModal() {
  return (
    <div>
      <h2>방 만들기</h2>
      <form>
        <div>
          <label>방 제목</label>
          <Input
            type="text"
            value={''}
            onChangeFnc={() => {}}
            placeholder="제목을 입력하세요."
          />
        </div>
        <div>
          <label>비밀번호</label>
          <Input
            type="text"
            value={'ㅇㅇ'}
            onChangeFnc={() => {}}
            placeholder="제목을 입력하세요."
          />
        </div>
        <Button isBorder={true} onClickFnc={() => {}}>
          <p>방만들기</p>
        </Button>
      </form>
    </div>
  );
}

export default CreateRoomModal;
