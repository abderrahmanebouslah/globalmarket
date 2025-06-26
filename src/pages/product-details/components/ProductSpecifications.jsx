import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductSpecifications = ({ specifications, language = "en" }) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['general']));
  const isRTL = language === 'ar';

  const defaultSpecifications = {
    general: {
      title: "General Information",
      specs: {
        "Brand": "TechGear",
        "Model": "TG-WH-001",
        "Product Type": "Wireless Headphones",
        "Color Options": "Black, White, Blue, Red",
        "Weight": "280g",
        "Dimensions": "190 x 160 x 70 mm",
        "Warranty": "2 Years International Warranty"
      }
    },
    technical: {
      title: "Technical Specifications",
      specs: {
        "Driver Size": "40mm Dynamic Drivers",
        "Frequency Response": "20Hz - 20kHz",
        "Impedance": "32 Ohms",
        "Sensitivity": "105dB ± 3dB",
        "THD": "< 0.1%",
        "Noise Cancellation": "Active Noise Cancellation (ANC)",
        "Microphone": "Built-in MEMS Microphone"
      }
    },
    connectivity: {
      title: "Connectivity & Battery",
      specs: {
        "Bluetooth Version": "5.2",
        "Supported Codecs": "SBC, AAC, aptX, aptX HD",
        "Range": "Up to 10 meters (33 feet)",
        "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
        "Charging Time": "2 hours (full charge)",
        "Quick Charge": "15 minutes = 3 hours playback",
        "Charging Port": "USB-C",
        "Battery Capacity": "500mAh"
      }
    },
    features: {
      title: "Features & Controls",
      specs: {
        "Active Noise Cancellation": "Yes, with 3 levels",
        "Transparency Mode": "Yes",
        "Touch Controls": "Yes, customizable",
        "Voice Assistant": "Google Assistant, Siri, Alexa",
        "Multi-device Pairing": "Up to 2 devices simultaneously",
        "App Support": "TechGear Connect App",
        "Equalizer": "Custom EQ via app",
        "Auto Pause/Play": "Yes, when removing headphones"
      }
    },
    compatibility: {
      title: "Compatibility",
      specs: {
        "Operating Systems": "iOS 12+, Android 6.0+, Windows 10+, macOS 10.14+",
        "Devices": "Smartphones, Tablets, Laptops, Desktop Computers",
        "Gaming Consoles": "PlayStation 5, Xbox Series X/S (with adapter)",
        "Audio Formats": "MP3, FLAC, AAC, WAV, ALAC",
        "Streaming Services": "Spotify, Apple Music, YouTube Music, Tidal"
      }
    },
    package: {
      title: "Package Contents",
      specs: {
        "In the Box": "Headphones, USB-C Charging Cable, 3.5mm Audio Cable, Carrying Case, Quick Start Guide, Warranty Card",
        "Carrying Case": "Premium Hard Case with Zipper",
        "Cable Length": "1.2m Audio Cable, 0.5m Charging Cable",
        "Documentation": "Multi-language User Manual (EN, FR, AR, ES, DE)"
      }
    }
  };

  const specsData = specifications || defaultSpecifications;

  const toggleSection = (sectionKey) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(Object.keys(specsData)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          Product Specifications
        </h2>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={expandAll}
            className="text-sm text-primary hover:underline"
          >
            Expand All
          </Button>
          <span className="text-text-muted">|</span>
          <Button
            variant="ghost"
            onClick={collapseAll}
            className="text-sm text-primary hover:underline"
          >
            Collapse All
          </Button>
        </div>
      </div>

      {/* Specifications Sections */}
      <div className="space-y-3">
        {Object.entries(specsData).map(([sectionKey, section]) => {
          const isExpanded = expandedSections.has(sectionKey);
          
          return (
            <div key={sectionKey} className="bg-surface rounded-lg border border-border overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionKey)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-hover transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-text-primary">
                  {section.title}
                </h3>
                
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`text-text-secondary transform transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-4 pb-4 animate-slide-down">
                  <div className="border-t border-border pt-4">
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(section.specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-border-light last:border-b-0"
                        >
                          <div className="font-medium text-text-primary sm:col-span-1">
                            {key}
                          </div>
                          <div className="text-text-secondary sm:col-span-2">
                            {typeof value === 'string' && value.includes(',') ? (
                              <div className="space-y-1">
                                {value.split(',').map((item, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                                    <span>{item.trim()}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span>{value}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Specs Summary */}
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <h3 className="text-lg font-medium text-primary mb-3">Key Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Headphones" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">Active Noise Cancellation</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Battery" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">40-hour Battery Life</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Bluetooth" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">Bluetooth 5.2</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">Quick Charge Technology</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">Multi-device Pairing</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={18} className="text-primary" />
            <span className="text-sm text-text-primary">2-year Warranty</span>
          </div>
        </div>
      </div>

      {/* Download Specifications */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 bg-surface-hover rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Icon name="FileText" size={20} className="text-text-secondary" />
          <div>
            <p className="font-medium text-text-primary">Complete Specifications</p>
            <p className="text-sm text-text-secondary">Download detailed product specifications (PDF)</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="sm:flex-shrink-0"
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default ProductSpecifications;