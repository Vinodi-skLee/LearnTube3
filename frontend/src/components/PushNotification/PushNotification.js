import { useRef } from "react";

const PushNotification = () => {
  const notificationRef = useRef(null);

  if (!Notification) {
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") return;
    });
  }

  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };

  const fireNotification = () => {
    const newOption = {
      badge: "",
      icon: "",
      ...options,
    };

    // notificationRef에 Notification을 넣어준다. 이 친구는 이렇게 할당만해도 바로 실행된다.
    notificationRef.current = new Notification(title, newOption);

    // 위에서 만든 클릭 이벤트 걸어주기
    setNotificationClickEvent();
  };

  return { fireNotification };
};

export default PushNotification;
