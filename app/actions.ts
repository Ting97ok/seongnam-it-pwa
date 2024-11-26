'use server'

const webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:chleogus124@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

// PushSubscription 타입 정의
type PushSubscriptionData = {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

let subscription: PushSubscriptionData | null = null;

export async function subscribeUser(subData: PushSubscriptionData) {
  subscription = subData;
  // 실제 환경에서는 데이터베이스에 저장
  // await db.subscriptions.create({ data: subData })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // 실제 환경에서는 데이터베이스에서 삭제
  // await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error('No subscription available');
  }

  try {
    await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: '가입 인사',
          body: message,
          icon: '/icon.png',
        })
    );
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
}