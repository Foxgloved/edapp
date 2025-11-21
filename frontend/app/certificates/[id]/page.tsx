'use client';

import DashboardLayout from '@/components/DashboardLayout';
import Certificate from '@/components/Certificate';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CertificateData {
  id: number;
  user_id: number;
  course_id: number;
  certificate_number: string;
  issued_at: string;
  completed_at: string;
  instructor_name: string;
  course_title: string;
  student_name: string;
  grade?: string;
  course_thumbnail?: string;
  course_category?: string;
  course_duration?: number;
}

export default function CertificateViewPage() {
  const params = useParams();
  const certificateId = params.id as string;
  
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCertificate();
  }, [certificateId]);

  const loadCertificate = async () => {
    try {
      setLoading(true);
      const data = await api.getCertificate(certificateId);
      setCertificate(data);
    } catch (err) {
      console.error('Error loading certificate:', err);
      setError('Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Back Button */}
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Certificates
        </Link>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="h-12 w-12 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Certificate Display */}
        {!loading && !error && certificate && (
          <Certificate
            certificateNumber={certificate.certificate_number}
            studentName={certificate.student_name}
            courseTitle={certificate.course_title}
            instructorName={certificate.instructor_name}
            completedAt={certificate.completed_at}
            issuedAt={certificate.issued_at}
            grade={certificate.grade}
            courseDuration={certificate.course_duration}
            courseCategory={certificate.course_category}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

