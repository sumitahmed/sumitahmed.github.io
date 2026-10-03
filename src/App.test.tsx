import React from 'react';
import { render, screen } from '@testing-library/react';
import { PROJECTS_DATA } from './lib/data';
import { ProjectCard } from './components/ProjectCard';

test('verifies project order, numbering, and Nyay Sarthi removal', () => {
  expect(PROJECTS_DATA).toHaveLength(6);
  expect(PROJECTS_DATA.map(p => p.id)).toEqual([1, 2, 3, 4, 5, 6]);
  expect(PROJECTS_DATA.map(p => p.title)).toEqual([
    'Panvas',
    'FreeCompute',
    'TabBridge',
    'AgriSense AI',
    'Hyperland Portfolio',
    'VidTube Platform',
  ]);
  expect(PROJECTS_DATA.some(p => p.title.toLowerCase().includes('nyay'))).toBe(false);
});

test('renders FreeCompute project card with correct title and links', () => {
  const freecompute = PROJECTS_DATA.find(p => p.title === 'FreeCompute')!;
  expect(freecompute).toBeDefined();
  expect(freecompute.id).toBe(2);
  expect(freecompute.githubUrl).toBe('https://github.com/sumitahmed/FreeCompute');
  expect(freecompute.image).toBe('/freecompute.webp');
  
  render(<ProjectCard project={freecompute} />);
  expect(screen.getByText('FreeCompute')).toBeInTheDocument();
  expect(screen.getByText('~/projects/2')).toBeInTheDocument();
});
