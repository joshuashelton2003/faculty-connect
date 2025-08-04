import { useState } from 'react';
import FilterSidebar from '@/components/FilterSidebar';

export default function FilterDemo() {
  const [currentFilters, setCurrentFilters] = useState(null);

  const handleFiltersChange = (filters: any) => {
    setCurrentFilters(filters);
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Filter Sidebar Demo</h1>
          <p className="text-gray-600">
            Professional, responsive filter component with live state management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar 
              onFiltersChange={handleFiltersChange}
              className="sticky top-8"
            />
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Filter Results</h2>
              
              {currentFilters ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Current filter state (updates live as you interact with the sidebar):
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(currentFilters, null, 2)}
                    </pre>
                  </div>

                  {/* Summary of active filters */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Active Filters Summary:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {currentFilters.salaryRange && (
                        <li>
                          💰 Salary: ₹{currentFilters.salaryRange.min.toLocaleString()} - ₹{currentFilters.salaryRange.max.toLocaleString()}
                        </li>
                      )}
                      {currentFilters.qualifications?.length > 0 && (
                        <li>
                          📚 Qualifications: {currentFilters.qualifications.join(', ')}
                        </li>
                      )}
                      {currentFilters.location?.state && (
                        <li>
                          📍 Location: {currentFilters.location.country}, {currentFilters.location.state}
                          {currentFilters.location.district && `, ${currentFilters.location.district}`}
                        </li>
                      )}
                      {currentFilters.applicationTypes?.length > 0 && (
                        <li>
                          📝 Application Types: {currentFilters.applicationTypes.join(', ')}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  No filters applied yet. Start by adjusting the filters in the sidebar.
                </p>
              )}
            </div>

            {/* Features Showcase */}
            <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">💰 Salary Range</h3>
                  <p className="text-sm text-gray-600">
                    Dual-slider with live updates from ₹5K to ₹1L
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">📚 Qualifications</h3>
                  <p className="text-sm text-gray-600">
                    Multi-select checkboxes with removable badges
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">📍 Location</h3>
                  <p className="text-sm text-gray-600">
                    Cascading dropdowns: Country → State → District
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">📝 Application Types</h3>
                  <p className="text-sm text-gray-600">
                    Checkbox group with visual feedback
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
