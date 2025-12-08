import { ItemViewProps } from "@meridian-ui/meridian";

export const ItemViewJob = ({ item, visibleAttributes }: ItemViewProps) => {
  const title = item.attributes.find((a: any) => a.roles?.includes("title"))?.value;
  const company = item.attributes.find((a: any) => a.roles?.includes("company"))?.value;
  const logo = item.attributes.find((a: any) => a.roles?.includes("logo"))?.value;
  const city = item.attributes.find((a: any) => a.roles?.includes("city"))?.value;
  const state = item.attributes.find((a: any) => a.roles?.includes("state"))?.value;
  const remoteType = item.attributes.find((a: any) => a.roles?.includes("remote-type"))?.value;
  const jobType = item.attributes.find((a: any) => a.roles?.includes("job-type"))?.value;
  const salary = item.attributes.find((a: any) => a.roles?.includes("salary"))?.value;

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
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
      {/* Company Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-start gap-3">
          {logo && (
            <img
              src={logo}
              alt={company}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 ring-2 ring-gray-100"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{company}</p>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">
            {city}, {state}
          </span>
        </div>

        {/* Salary */}
        {salary && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-gray-700 line-clamp-1">
              {formatSalary(salary)}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {remoteType && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
              {remoteType}
            </span>
          )}
          {jobType && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
              {jobType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
