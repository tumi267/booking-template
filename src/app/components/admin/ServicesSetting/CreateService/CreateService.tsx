'use client'
import React, { useState, ChangeEvent } from 'react';

interface Service {
  name: string;
  description: string;
  duration: string;
  price: number;
  providers: string[];
}

interface Provider {
  id: string;
  name: string;
}

interface CreateServiceProps {
  openCreateModule: () => void;
}

function CreateService({ openCreateModule }: CreateServiceProps) {
  const [service, setService] = useState<Service>({
    name: '',
    description: '',
    duration: '',
    price: 0,
    providers: []
  });

  // Mock data for providers - replace with actual data from props/API
  const availableProviders: Provider[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
    { id: '4', name: 'Sarah Wilson' },
    { id: '5', name: 'David Brown' },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setService(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setService(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleProvider = (providerId: string) => {
    setService(prev => {
      const isSelected = prev.providers.includes(providerId);
      if (isSelected) {
        // Remove provider if already selected
        return {
          ...prev,
          providers: prev.providers.filter(id => id !== providerId)
        };
      } else {
        // Add provider if not selected
        return {
          ...prev,
          providers: [...prev.providers, providerId]
        };
      }
    });
  };

  const removeProvider = (providerId: string) => {
    setService(prev => ({
      ...prev,
      providers: prev.providers.filter(id => id !== providerId)
    }));
  };

  const getSelectedProviderNames = (): string[] => {
    return service.providers.map(providerId => {
      const provider = availableProviders.find(p => p.id === providerId);
      return provider ? provider.name : '';
    }).filter(name => name !== '');
  };

  const isProviderSelected = (providerId: string): boolean => {
    return service.providers.includes(providerId);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <form className='bg-white p-6 shadow-xl w-96 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold'>Create Service</h2>
          <button 
            type='button'
            onClick={openCreateModule}
            className='text-gray-500 hover:text-gray-700 text-xl font-bold'
          >
            ×
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Service Name
            </label>
            <input 
              type="text" 
              name="name"
              placeholder="Service Name"
              value={service.name} 
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Description
            </label>
            <input 
              type="text" 
              name="description"
              placeholder="Description"
              value={service.description} 
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Price
            </label>
            <input 
              type="number" 
              name="price"
              placeholder="Price"
              step="0.01"
              min="0"
              value={service.price} 
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Duration
            </label>
            <input 
              type="text" 
              name="duration"
              placeholder="Duration (e.g., 30min, 1h)"
              value={service.duration} 
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Selected Providers Display */}
          {service.providers.length > 0 && (
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Selected Providers ({service.providers.length})
              </label>
              <div className='flex flex-wrap gap-2 mb-3'>
                {getSelectedProviderNames().map((providerName, index) => (
                  <div
                    key={service.providers[index]}
                    className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 text-sm'
                  >
                    <span>{providerName}</span>
                    <button
                      type='button'
                      onClick={() => removeProvider(service.providers[index])}
                      className='ml-2 text-blue-600 hover:text-blue-800 font-bold'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Providers Checkbox List */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Select Providers {service.providers.length > 0 && `(${service.providers.length} selected)`}
            </label>
            <div className='border border-gray-300 max-h-32 overflow-y-auto'>
              {availableProviders.map(provider => (
                <div
                  key={provider.id}
                  className={`flex items-center px-3 py-2 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                    isProviderSelected(provider.id)
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleProvider(provider.id)}
                >
                  <input
                    type="checkbox"
                    checked={isProviderSelected(provider.id)}
                    onChange={() => {}} // Handled by the div click
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <span className={`ml-3 text-sm ${
                    isProviderSelected(provider.id) ? 'text-blue-800 font-medium' : 'text-gray-700'
                  }`}>
                    {provider.name}
                  </span>
                </div>
              ))}
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              Click to select/deselect providers
            </p>
          </div>
        </div>

        <div className='flex justify-end space-x-3 mt-6'>
          <button
            type='button'
            onClick={openCreateModule}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              // Handle form submission here
              console.log('Service data:', service);
              // openCreateModule();
            }}
            className='px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors'
          >
            Create Service
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateService;