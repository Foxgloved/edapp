'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Award, Calendar, Book, Trophy, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

interface Certificate {
  id: number;
  course_id: number;
  certificate_number: string;
  issued_at: string;
  completed_at: string;
  instructor_name: string;
  course_title: string;
  student_name: string;
  grade?: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await api.getCertificates();
      setCertificates(data);
    } catch (err) {
      console.error('Error loading certificates:', err);
      setError('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          </div>
          <p className="text-gray-600">View and download your course completion certificates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Certificates</p>
                <p className="text-3xl font-bold">{certificates.length}</p>
              </div>
              <Award className="h-12 w-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Courses Completed</p>
                <p className="text-3xl font-bold">{certificates.length}</p>
              </div>
              <Book className="h-12 w-12 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Achievements</p>
                <p className="text-3xl font-bold">{certificates.filter(c => c.grade === 'Excellent').length}</p>
                <p className="text-xs text-green-100">Excellent grades</p>
              </div>
              <Trophy className="h-12 w-12 text-green-200" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && certificates.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
            <p className="text-gray-600 mb-6">Complete courses to earn certificates</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Book className="h-5 w-5" />
              Browse Courses
            </Link>
          </div>
        )}

        {/* Certificates Grid */}
        {!loading && !error && certificates.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Link
                key={certificate.id}
                href={`/certificates/${certificate.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group"
              >
                {/* Certificate Header */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white relative overflow-hidden">
                  <Award className="h-16 w-16 mb-3 opacity-90" />
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8">
                    <Award className="h-48 w-48" />
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {certificate.course_title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Completed: {formatDate(certificate.completed_at)}</span>
                    </div>
                    {certificate.grade && (
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        <span>Grade: {certificate.grade}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-mono mb-2">
                      {certificate.certificate_number}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">View Certificate</span>
                      <ExternalLink className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

