import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Dropdown } from './Dropdown';
import { Card } from './Card';
import { RadioGroup } from './RadioGroup';
import { InfoCallout } from './InfoCallout';
import { StatusPill } from './StatusPill';
import { Calendar } from 'lucide-react';

export function DesignSystem() {
  return (
    <div className="min-h-screen bg-neutral-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-header-1 text-body mb-2">
          Design Tokens & Components
        </h1>
        <p className="text-muted text-sm mb-8">
          Mada Médical — Scoliose Logistique Design System
        </p>

        {/* App Overview */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">App Overview</h2>
          <Card>
            <div className="space-y-4 text-sm text-body">
              <p>
                <strong>Mada Médical — Scoliose Logistique</strong> is a medical logistics application 
                designed for healthcare professionals to manage and track surgery equipment 
                from stock to operating room.
              </p>
              <div>
                <h3 className="font-semibold mb-2">Main Screens</h3>
                <ul className="list-disc list-inside text-muted space-y-1">
                  <li><strong>Accueil:</strong> Home screen with empty state and quick actions</li>
                  <li><strong>Commandes:</strong> List of all orders with status indicators</li>
                  <li><strong>Suivi:</strong> Detailed order tracking with timeline and map</li>
                  <li><strong>Profil:</strong> User profile and settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Order Creation Flow (4 Steps)</h3>
                <ol className="list-decimal list-inside text-muted space-y-1">
                  <li>General information (hospital, date, intervention type)</li>
                  <li>Material selection (equipment with quantity controls)</li>
                  <li>Logistics (delivery mode, time slot, contact)</li>
                  <li>Validation and confirmation</li>
                </ol>
              </div>
            </div>
          </Card>
        </section>

        {/* Color Tokens */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="w-full h-20 bg-primary rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-body">Primary</p>
              <p className="text-xs text-muted">#2B9DB3</p>
            </Card>
            <Card>
              <div className="w-full h-20 bg-primary-dark rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-body">Primary Dark / CTA</p>
              <p className="text-xs text-muted">#197B95</p>
            </Card>
            <Card>
              <div className="w-full h-20 bg-accent rounded-lg mb-3"></div>
              <p className="text-sm font-semibold text-body">Accent / Success</p>
              <p className="text-xs text-muted">#6DC58A</p>
            </Card>
            <Card>
              <div className="w-full h-20 bg-neutral-bg rounded-lg border border-border mb-3"></div>
              <p className="text-sm font-semibold text-body">Neutral Background</p>
              <p className="text-xs text-muted">#F6F7F8</p>
            </Card>
            <Card>
              <div className="w-full h-20 bg-white rounded-lg border border-border mb-3"></div>
              <p className="text-sm font-semibold text-body">Card Background</p>
              <p className="text-xs text-muted">#FFFFFF</p>
            </Card>
            <Card>
              <div className="w-full h-20 rounded-lg mb-3 flex items-center justify-center" style={{backgroundColor: '#6B7785'}}>
                <span className="text-white text-xs">Muted Text</span>
              </div>
              <p className="text-sm font-semibold text-body">Muted</p>
              <p className="text-xs text-muted">#6B7785</p>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Typography</h2>
          <Card>
            <div className="space-y-4">
              <div>
                <h1 className="text-header-1">Header 1 — 24/28 Semibold</h1>
                <p className="text-xs text-muted mt-1">font-size: 24px, line-height: 28px, font-weight: 600</p>
              </div>
              <div>
                <h2 className="text-header-2">Header 2 — 18/20 Semibold</h2>
                <p className="text-xs text-muted mt-1">font-size: 18px, line-height: 20px, font-weight: 600</p>
              </div>
              <div>
                <p className="text-body">Body — 14px Regular</p>
                <p className="text-xs text-muted mt-1">font-size: 14px, line-height: 20px, font-weight: 400</p>
              </div>
              <div>
                <p className="text-small">Small — 12px Regular</p>
                <p className="text-xs text-muted mt-1">font-size: 12px, line-height: 16px, font-weight: 400</p>
              </div>
              <div>
                <p className="text-button">Button — 16px Medium</p>
                <p className="text-xs text-muted mt-1">font-size: 16px, line-height: 20px, font-weight: 500</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Spacing */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Spacing (8pt Grid)</h2>
          <Card>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="w-1 bg-primary" style={{height: '4px'}}></div>
                <span className="text-sm text-body">4px (xs)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 bg-primary" style={{height: '8px'}}></div>
                <span className="text-sm text-body">8px (sm)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 bg-primary" style={{height: '12px'}}></div>
                <span className="text-sm text-body">12px (md)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 bg-primary" style={{height: '16px'}}></div>
                <span className="text-sm text-body">16px (lg) — Horizontal padding</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 bg-primary" style={{height: '24px'}}></div>
                <span className="text-sm text-body">24px (2xl)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 bg-primary" style={{height: '32px'}}></div>
                <span className="text-sm text-body">32px (3xl)</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Border Radius */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Border Radius</h2>
          <div className="grid grid-cols-4 gap-4">
            <Card className="text-center">
              <div className="w-full h-16 bg-primary mb-2" style={{borderRadius: '8px'}}></div>
              <p className="text-xs text-body">8px (sm)</p>
            </Card>
            <Card className="text-center">
              <div className="w-full h-16 bg-primary mb-2" style={{borderRadius: '10px'}}></div>
              <p className="text-xs text-body">10px (buttons)</p>
            </Card>
            <Card className="text-center">
              <div className="w-full h-16 bg-primary mb-2" style={{borderRadius: '12px'}}></div>
              <p className="text-xs text-body">12px (cards)</p>
            </Card>
            <Card className="text-center">
              <div className="w-full h-16 bg-primary mb-2" style={{borderRadius: '20px'}}></div>
              <p className="text-xs text-body">20px (header)</p>
            </Card>
          </div>
        </section>

        {/* Components */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Component Library</h2>
          
          <div className="space-y-6">
            <Card>
              <h3 className="text-sm font-semibold text-body mb-4">Buttons</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex gap-3">
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="primary" size="small">Small</Button>
                </div>
                <Button variant="primary" fullWidth>Full Width Button</Button>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-body mb-4">Form Inputs</h3>
              <div className="space-y-4">
                <Input
                  label="Text Input"
                  placeholder="Placeholder text"
                />
                <Input
                  label="Input with Icon"
                  placeholder="Select date"
                  icon={<Calendar className="w-5 h-5" />}
                />
                <Input
                  label="Error State"
                  placeholder="Invalid input"
                  error="This field is required"
                />
                <Dropdown
                  label="Dropdown"
                  placeholder="Select an option"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                  ]}
                />
              </div>
            </Card>


            <Card>
              <h3 className="text-sm font-semibold text-body mb-4">Status Pills</h3>
              <div className="flex flex-wrap gap-2">
                <StatusPill status="pending" />
                <StatusPill status="preparation" />
                <StatusPill status="in-transit" />
                <StatusPill status="delivered" />
                <StatusPill status="cancelled" />
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-body mb-4">Callouts</h3>
              <div className="space-y-3">
                <InfoCallout type="success">
                  Success callout with checkmark icon and green tint background.
                </InfoCallout>
                <InfoCallout type="info">
                  Info callout with info icon and blue tint background.
                </InfoCallout>
                <InfoCallout type="warning">
                  Warning callout with alert icon and yellow tint background.
                </InfoCallout>
              </div>
            </Card>
          </div>
        </section>

        {/* Guidelines */}
        <section className="mb-12">
          <h2 className="text-header-2 text-body mb-4">Design Guidelines</h2>
          <Card>
            <div className="space-y-4 text-sm text-body">
              <div>
                <h3 className="font-semibold mb-2">Grid System</h3>
                <ul className="list-disc list-inside text-muted space-y-1">
                  <li>8pt baseline grid</li>
                  <li>16px horizontal padding (mobile)</li>
                  <li>12-column mobile grid</li>
                  <li>Target device: iPhone 13/14 (390×844)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shadows</h3>
                <ul className="list-disc list-inside text-muted space-y-1">
                  <li>Card shadow: 0 6px 18px rgba(6,18,38,0.06)</li>
                  <li>Input shadow: 0 2px 8px rgba(6,18,38,0.04)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Typography</h3>
                <ul className="list-disc list-inside text-muted space-y-1">
                  <li>Font family: Inter (fallback to system fonts)</li>
                  <li>Maintain minimum 14px body text for readability</li>
                  <li>Use semibold (600) for headers, medium (500) for buttons</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <ul className="list-disc list-inside text-muted space-y-1">
                  <li>Minimum touch target: 44×44px</li>
                  <li>Color contrast ratio: minimum 4.5:1 for text</li>
                  <li>Interactive elements have focus states</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        <div className="text-center text-xs text-muted pb-8">
          <p>Mada Médical — Scoliose Logistique Design System v1.0</p>
          <p className="mt-1">Built with React, TypeScript & Tailwind CSS v4</p>
        </div>
      </div>
    </div>
  );
}