import { DetailViewProps } from "@meridian-ui/meridian";

export const DetailViewJob = ({ item }: DetailViewProps) => {
  const title = item.attributes.find((a: any) => a.roles?.includes("title"))?.value;
  const company = item.attributes.find((a: any) => a.roles?.includes("company"))?.value;
  const logo = item.attributes.find((a: any) => a.roles?.includes("logo"))?.value;
  const city = item.attributes.find((a: any) => a.roles?.includes("city"))?.value;
  const state = item.attributes.find((a: any) => a.roles?.includes("state"))?.value;
  const remoteType = item.attributes.find((a: any) => a.roles?.includes("remote-type"))?.value;
  const jobType = item.attributes.find((a: any) => a.roles?.includes("job-type"))?.value;
  const level = item.attributes.find((a: any) => a.roles?.includes("experience-level"))?.value;
  const department = item.attributes.find((a: any) => a.roles?.includes("department"))?.value;
  const salary = item.attributes.find((a: any) => a.roles?.includes("salary"))?.value;
  const description = item.attributes.find((a: any) => a.roles?.includes("description"))?.value;
  const requirements = item.attributes.find((a: any) => a.roles?.includes("requirements"))?.value;
  const responsibilities = item.attributes.find((a: any) => a.roles?.includes("responsibilities"))?.value;
  const benefits = item.attributes.find((a: any) => a.roles?.includes("benefits"))?.value;
  const skills = item.attributes.find((a: any) => a.roles?.includes("skills"))?.value;
  const applicants = item.attributes.find((a: any) => a.roles?.includes("applicants"))?.value;

  const formatSalary = (salaryData: any) => {
    if (!salaryData) return "";
    const { min, max, currency } = salaryData;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Top Banner */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-8">
            <div className="flex items-start gap-6">
              {logo && (
                <img
                  src={logo}
                  alt={company}
                  className="w-20 h-20 rounded-xl object-cover ring-4 ring-gray-50 flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <div className="flex items-center gap-2 text-lg text-gray-600 mb-4">
                  <span className="font-semibold">{company}</span>
                  <span className="text-gray-400">•</span>
                  <span>{city}, {state}</span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {remoteType && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {remoteType}
                    </span>
                  )}
                  {jobType && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {jobType}
                    </span>
                  )}
                  {level && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 border border-purple-100">
                      {level}
                    </span>
                  )}
                  {department && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      {department}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Salary and Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-6">
              {salary && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-semibold text-gray-900">{formatSalary(salary)}</p>
                  </div>
                </div>
              )}
              {applicants && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Applicants</p>
                    <p className="font-semibold text-gray-900">{applicants}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <div className="mt-6">
              <button className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        )}

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {responsibilities.map((resp: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <ul className="space-y-3">
              {benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
