'use client';

import React, { useRef } from 'react';
import { Award, Download, Share2, CheckCircle } from 'lucide-react';

interface CertificateProps {
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  instructorName: string;
  completedAt: string;
  issuedAt: string;
  grade?: string;
  courseDuration?: number;
  courseCategory?: string;
}

export default function Certificate({
  certificateNumber,
  studentName,
  courseTitle,
  instructorName,
  completedAt,
  issuedAt,
  grade,
  courseDuration,
  courseCategory
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      // Using html2canvas for client-side screenshot
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `certificate-${certificateNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Course Completion Certificate',
      text: `I've completed ${courseTitle}!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download Certificate
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      {/* Certificate */}
      <div
        ref={certificateRef}
        className="bg-white p-12 rounded-xl shadow-2xl border-8 border-double border-blue-600 relative"
        style={{
          backgroundImage: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))'
        }}
      >
        {/* Decorative Corner Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-blue-600"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-blue-600"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-blue-600"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-blue-600"></div>

        {/* Certificate Content */}
        <div className="text-center space-y-8 py-8">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex justify-center mb-4">
              <Award className="h-20 w-20 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-wide">
              Certificate of Completion
            </h1>
            <p className="text-lg text-gray-600">This is to certify that</p>
          </div>

          {/* Student Name */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-blue-600 border-b-2 border-gray-300 pb-2 inline-block px-8">
              {studentName}
            </h2>
          </div>

          {/* Course Details */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-lg text-gray-700">
              has successfully completed the course
            </p>
            <h3 className="text-3xl font-bold text-gray-900">
              {courseTitle}
            </h3>
            
            {/* Additional Info */}
            <div className="flex justify-center gap-6 text-sm text-gray-600 pt-4">
              {courseCategory && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{courseCategory}</span>
                </div>
              )}
              {courseDuration && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{courseDuration} Hours</span>
                </div>
              )}
              {grade && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Grade: {grade}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dates and Signature */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto pt-8 mt-8 border-t border-gray-200">
            <div className="text-left">
              <div className="border-b-2 border-gray-400 pb-2 mb-2">
                <p className="text-xl font-semibold text-gray-900">{instructorName}</p>
              </div>
              <p className="text-sm text-gray-600">Instructor</p>
            </div>
            <div className="text-right">
              <div className="border-b-2 border-gray-400 pb-2 mb-2">
                <p className="text-xl font-semibold text-gray-900">{formatDate(completedAt)}</p>
              </div>
              <p className="text-sm text-gray-600">Completion Date</p>
            </div>
          </div>

          {/* Certificate Number */}
          <div className="pt-4">
            <p className="text-xs text-gray-500 font-mono">
              Certificate No: {certificateNumber}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Issued on: {formatDate(issuedAt)}
            </p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <Award className="h-96 w-96 text-blue-600" />
        </div>
      </div>
    </div>
  );
}

