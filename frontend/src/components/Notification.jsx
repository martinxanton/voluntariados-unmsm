import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_USER_NOTIFICATION = gql`
  query getNotificationsByUserId($idUsuario: ID!) {
    getNotificationsByUserId(idUsuario: $idUsuario) {
      id
      categoria
      mensaje
      fecha
    }
  }
`;

const Notification = ({ closeModal, userId }) => {
  const { loading, error, data } = useQuery(GET_USER_NOTIFICATION, {
    variables: { idUsuario: userId },
  });

  if (loading) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg shadow p-5">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
        <div className="bg-white rounded-lg shadow p-5">
          <p className="text-red-500">Error loading notifications.</p>
        </div>
      </div>
    );
  }

  const notifications = data.getNotificationsByUserId
    .slice()
    .map((notification) => ({
      ...notification,
      fecha: new Date(parseInt(notification.fecha)),
    }))
    .sort((a, b) => b.fecha - a.fecha)
    .slice(0, 4);

    const handleNotificationClick = (volunteeringId) => {
        if (volunteeringId) {
          navigate(`/${volunteeringId}/details`); 
        }
      };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notificationes Recientes
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-4 md:p-5">
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 border border-gray-300 rounded-lg dark:border-gray-600"
                onClick={() => handleNotificationClick(notification.volunteeringId) }
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {notification.categoria}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {notification.mensaje}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.fecha.toLocaleString()} {/* Mostrar fecha formateada */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
