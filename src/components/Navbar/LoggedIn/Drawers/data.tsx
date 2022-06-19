import { IoDocumentOutline } from 'react-icons/io5';

interface NotificationItem {
  icon: JSX.Element;
  text: string;
  time: string;
}

const data: NotificationItem[] = [
  {
    icon: <IoDocumentOutline className="menuitem-icon" />,
    text: 'Commercial invoice',
    time: '10 minutes ago',
  },
  {
    icon: <IoDocumentOutline className="menuitem-icon" />,
    text: 'Received Bill of Loading',
    time: '1 hour ago',
  },
  {
    icon: <IoDocumentOutline className="menuitem-icon" />,
    text: 'Airway bill of loading',
    time: '1 hour ago',
  },
  {
    icon: <IoDocumentOutline className="menuitem-icon" />,
    text: 'Letter of credit',
    time: '2 hours ago',
  },
];

export default data;
