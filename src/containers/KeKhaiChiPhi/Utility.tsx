import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import EditCostModal from './EditCostModal';

interface Props {
  removeTableRow: (item: API.ITEMBK) => void;
  editTableRow: (item: API.ITEMBK) => void;
  copyTableRow: (item: API.ITEMBK) => void;
  item: API.ITEMBK;
}

const UtilityDropDown: React.FC<Props> = ({
  // dropdownOpen,
  editTableRow,
  removeTableRow,
  copyTableRow,
  // toggle,
  item,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function toggle(): void {
    setDropdownOpen(prevState => !prevState);
  }

  const handleRemoveTableRow = (): void => {
    removeTableRow(item);
  };
  const toggleModal = (): void => {
    setShowModal(!showModal);
  };
  const showEditModal = (): void => {
    setShowModal(true);
  };
  const handleCopyTableRow = (): void => {
    copyTableRow(item);
  };

  return (
    <div className="sipTableAmountListGroup">
      <Dropdown className="sipTableAmountListOption" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle>
          <img src={'../../assets/img/icon/iconOption.svg'} alt="VTPostek" />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem key={1} onClick={handleRemoveTableRow}>
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
      <EditCostModal isOpen={showModal} toggle={toggleModal} handleEditItem={editTableRow} item={item} />
    </div>
  );
};

export default UtilityDropDown;
