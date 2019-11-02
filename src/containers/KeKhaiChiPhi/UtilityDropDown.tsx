import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import SimpleConfirmModal from 'components/Modal/SimpleConfirmModal';
import ModalThemMoiChiPhi from './ModalThemMoiChiPhi';

interface Props {
  removeTableRow: (item: API.ITEMBK) => void;
  editTableRow: (item: API.ITEMBK) => void;
  copyTableRow: (item: API.ITEMBK) => void;
  item: API.ITEMBK;
  khoanMuc: string;
}

// eslint-disable-next-line max-lines-per-function
const UtilityDropDown: React.FC<Props> = ({
  editTableRow,
  removeTableRow,
  copyTableRow,
  khoanMuc,
  item,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [showModalThemMoiChiPhi, setShowModalThemMoiChiPhi] = useState<boolean>(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function toggle(): void {
    setDropdownOpen(prevState => !prevState);
  }

  const handleRemoveTableRow = (): void => {
    removeTableRow(item);
  };
  const toggleModalThemMoiChiPhi = (): void => {
    setShowModalThemMoiChiPhi(!showModalThemMoiChiPhi);
  };
  const showEditModal = (): void => {
    setShowModalThemMoiChiPhi(true);
  };
  const handleCopyTableRow = (): void => {
    copyTableRow(item);
  };
  const closeEditModal = (): void => {
    setShowModalThemMoiChiPhi(false);
  };

  const showDeleteConfirmModal = (): void => {
    setShowModalConfirmDelete(true);
  };

  const closeDeleteConfirmModal = (): void => {
    setShowModalConfirmDelete(false);
  };

  const toggleModalConfirmDelete = (): void => {
    setShowModalConfirmDelete(!showModalConfirmDelete);
  };

  return (
    <div className="sipTableAmountListGroup">
      <Dropdown className="sipTableAmountListOption" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <img src={'../../assets/img/icon/iconOption.svg'} alt="VTPostek" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key={1} onClick={showDeleteConfirmModal}>
            <img src={'../../assets/img/icon/iconRemove.svg'} alt="VTPostek" /> {t('Xóa')}
          </DropdownItem>
          <DropdownItem key={2} onClick={showEditModal}>
            <img src={'../../assets/img/icon/iconPencil.svg'} alt="VTPostek" /> {t('Chỉnh sửa')}
          </DropdownItem>
          <DropdownItem key={3} onClick={handleCopyTableRow}>
            <img className="ml-1" src={'../../assets/img/icon/iconCopy.svg'} alt="VTPostek" /> {t('Sao chép')}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ModalThemMoiChiPhi
        type="edit"
        showModal={showModalThemMoiChiPhi}
        toggle={toggleModalThemMoiChiPhi}
        khoanMuc={khoanMuc}
        tenKhoanMuc={''}
        submit={editTableRow}
        closeModal={closeEditModal}
        editItem={item}
      />
      <SimpleConfirmModal
        isOpen={showModalConfirmDelete}
        toggle={toggleModalConfirmDelete}
        onDelete={handleRemoveTableRow}
        onCancel={closeDeleteConfirmModal}
      />
    </div>
  );
};

export default UtilityDropDown;
