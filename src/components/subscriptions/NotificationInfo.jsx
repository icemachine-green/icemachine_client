import './NotificationInfo.css';
import usePushNotifications from "../../hooks/usePushNotifications.jsx";
import { useSelector } from 'react-redux';

export default function NotificationInfo() {
  const { isInit, isSubscribing, isCheckedSubscribe, subscribeUser } = usePushNotifications();
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <>
      {
        ( isLoggedIn && isInit && !isSubscribing && !isCheckedSubscribe) && (
          <div className="notification-info-container">
            <div className="notification-info-content-box">
              <div className="notification-info-content-info">
                <p className="notification-info-desc">
                  서비스 정책에 의한 <strong>불가피한 예약 취소시</strong> 알림을 드립니다.
                </p>
                <p className="notification-info-sub">
                  광고성 알림은 발송하지 않습니다.
                </p>
              </div>
              <div className="notification-info-btn-box">
                <button type="button" className='btn-primary' onClick={subscribeUser}>알림 허용하기</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}