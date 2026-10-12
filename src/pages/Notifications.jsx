import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { notificationItems } from '../data/mockData';

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(notificationItems);

  const filtered = activeTab === 'All' 
    ? notifications 
    : activeTab === 'Unread'
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === activeTab.toLowerCase() || (activeTab === 'Approvals' && n.type === 'action'));

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'action': return <Bell className="w-5 h-5 text-orange-500" />;
      case 'deadline': return <Clock className="w-5 h-5 text-purple-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = (priority) => {
    switch(priority) {
      case 'critical': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'normal': return 'border-blue-500';
      default: return 'border-slate-300';
    }
  };

  return (
    <div className="page-enter p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications & Alerts</h1>
          <p className="text-slate-500 text-sm">सूचनाएं एवं अलर्ट</p>
        </div>
        <button onClick={markAllRead} className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Mark All as Read
        </button>
      </div>

      <div className="card">
        <div className="border-b px-2 py-2 flex space-x-2 overflow-x-auto">
          {['All', 'Unread', 'Approvals', 'Deadlines', 'Alerts'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab} {tab === 'Unread' && <span className="ml-1 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">{notifications.filter(n=>!n.read).length}</span>}
            </button>
          ))}
        </div>

        <div className="divide-y">
          {filtered.length > 0 ? filtered.map(item => (
            <div key={item.id} className={`p-4 flex gap-4 hover:bg-slate-50 transition-colors border-l-4 ${getBorderColor(item.priority)} ${!item.read ? 'bg-blue-50/30' : ''}`}>
              <div className="mt-1 flex-shrink-0 bg-white rounded-full p-1 shadow-sm">
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm ${!item.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{item.title}</h4>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{item.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{item.message}</p>
                {item.project && <p className="text-xs text-slate-400 mt-2 font-medium">Project: {item.project}</p>}
              </div>
              {!item.read && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>}
            </div>
          )) : (
            <div className="p-8 text-center text-slate-500">
              <Bell className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p>No notifications found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
