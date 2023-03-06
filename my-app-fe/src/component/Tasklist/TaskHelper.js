import React from 'react';
import high from './assets/img/highprio.webp';
import mid from './assets/img/medprio.webp';
import low from './assets/img/lowprio.webp';

const avatars = [high, mid, low];

function getAvatar() {
  return avatars[Math.floor(Math.random() * 3)];
}

function log(msg) {
  console.log(`>>> ${msg}`);
}

function getPriorityBadge(severity = 'low', completed = false) {
  const level =
    severity === 'high' ? 'danger' : severity === 'mid' ? 'warning' : 'info';

  const badgeCompleted = completed ? (
    <small>
      <span className="ms-1 badge bg-secondary">completed</span>
    </small>
  ) : null;

  // "badge bg-danger"
  return (
    <>
      <small>
        <span className={`badge bg-${level}`}>{severity}</span>
      </small>
      {badgeCompleted}
    </>
  );
  // low -- blue/info
  // mid -- orange/warning
  // high -- red/danger
  // if completed, display new badge with completed text
}

export { getAvatar, log, getPriorityBadge };
