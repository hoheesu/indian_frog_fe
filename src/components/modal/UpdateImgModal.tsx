import ClosedModalButton from './ClosedModalButton';
import { useRef, useState } from 'react';
import { useUpdateProfileMutation } from '../../hooks/useMutation';

import styled from 'styled-components';
import { useIsModalStore } from '../../store/modal/CreateModalStore';
function UpdateImgModal() {
  const upDateProfile = useUpdateProfileMutation();
  const [selectImg, setSelectImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const useSetIsModalClick = useIsModalStore((state) => state.setIsModalClick);
  const handleImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024;
    const file = e.target.files && e.target.files[0];
    if (file && file.size > maxSize) {
      alert('파일첨부 사이즈는 5MB 이하만 가능합니다');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    file && setSelectImg(file);
  };
  const handleUpdateProfileClick = () => {
    selectImg && upDateProfile.mutate({ userImg: selectImg });
    if (selectImg) {
      useSetIsModalClick();
    }
  };
  return (
    <ProfileChangeWarp>
      <ClosedModalButton />
      <h2>프로필 이미지 변경</h2>
      <FileSelected>
        <input
          ref={fileInputRef}
          accept="image/jpeg, image/png, image/jpg"
          type="file"
          onChange={handleImgInputChange}
        ></input>
        <button onClick={handleUpdateProfileClick}>이미지 첨부</button>
      </FileSelected>
    </ProfileChangeWarp>
  );
}
const ProfileChangeWarp = styled.div`
  h2 {
    font-size: 20px;
  }
  @media (max-height: 600px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;
const FileSelected = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  input[type='file']::file-selector-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 10px;
    width: 100px;
    height: 40px;
    background: var(--color-main);
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    border: none;
  }
  button {
    padding: 5px 20px;
    height: 50px;
    min-width: 130px;
    border: 1px solid var(--color-main);
    border-radius: 10px;
    color: var(--color-main);
    &:hover {
      background: var(--color-main);
      color: #fff;
    }
  }
`;

export default UpdateImgModal;
