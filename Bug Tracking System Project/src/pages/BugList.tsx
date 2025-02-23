import React from 'react';
import { Link } from 'react-router-dom';
import { Bug, Clock, CheckCircle, AlertTriangle, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BugItem {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedTo?: string;
}

const mockBugs: BugItem[] = [
  {
    id: '1',
    title: 'Login page not responsive on mobile devices',
    status: 'open',
    priority: 'high',
    createdAt: '2024-03-15T10:00:00Z',
    assignedTo: 'john@example.com',
  },
  {
    id: '2',
    title: 'Dashboard statistics not updating in real-time',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-03-14T15:30:00Z',
    assignedTo: 'sarah@example.com',
  },
  {
    id: '3',
    title: 'Incorrect date format in reports',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-03-13T09:15:00Z',
  },
];

const statusIcons = {
  open: AlertTriangle,
  in_progress: Clock,
  resolved: CheckCircle,
};

const statusColors = {
  open: 'text-red-600',
  in_progress: 'text-yellow-600',
  resolved: 'text-green-600',
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export function BugList() {
  const { role } = useAuth();
  const StatusIcon = AlertTriangle;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Bug Reports
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            to="/bugs/new"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Bug Report
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <ul role="list" className="divide-y divide-gray-100">
          {mockBugs.map((bug) => {
            const StatusIcon = statusIcons[bug.status];
            return (
              <li key={bug.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <Link to={`/bugs/${bug.id}`} className="hover:underline">
                          {bug.title}
                        </Link>
                      </p>
                      <span className={`flex-none rounded-full ${priorityColors[bug.priority]} px-2 py-1 text-xs font-medium ring-1 ring-inset`}>
                        {bug.priority}
                      </span>
                    </div>
                    {bug.assignedTo && (
                      <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                        <p className="truncate">Assigned to: {bug.assignedTo}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {new Date(bug.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusIcon className={`h-5 w-5 ${statusColors[bug.status]}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}