import React from 'react';
import renderer, { act } from 'react-test-renderer';

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, ...props }: any) => <Text {...props}>{name}</Text>,
  };
});

jest.mock('@/constants/colors', () => ({
  __esModule: true,
  default: {
    star: '#FFC107',
    textSecondary: '#6B7280',
  },
}));

import { StarRating } from '../components/StarRating';

function getTextNodes(tree: any): string[] {
  const texts: string[] = [];
  function walk(node: any) {
    if (!node) return;
    if (typeof node === 'string') {
      texts.push(node);
      return;
    }
    if (node.children) {
      node.children.forEach(walk);
    }
  }
  walk(tree);
  return texts;
}

describe('StarRating', () => {
  it('should render correct number of full stars for rating 4', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<StarRating rating={4.0} count={100} />);
    });
    const tree = component!.toJSON();
    const texts = getTextNodes(tree);
    const fullStars = texts.filter(t => t === 'star');
    expect(fullStars.length).toBe(4);
  });

  it('should render half star when applicable', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<StarRating rating={3.5} count={50} />);
    });
    const tree = component!.toJSON();
    const texts = getTextNodes(tree);
    const halfStars = texts.filter(t => t === 'star-half');
    expect(halfStars.length).toBe(1);
  });

  it('should display rating text with count', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<StarRating rating={4.0} count={350} />);
    });
    const tree = component!.toJSON();
    const texts = getTextNodes(tree);
    const allText = texts.join(' ');
    expect(allText).toContain('4.0');
    expect(allText).toContain('350');
  });

  it('should render 5 empty stars for rating 0', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<StarRating rating={0} />);
    });
    const tree = component!.toJSON();
    const texts = getTextNodes(tree);
    const emptyStars = texts.filter(t => t === 'star-outline');
    expect(emptyStars.length).toBe(5);
  });

  it('should render component without crashing', () => {
    let component: renderer.ReactTestRenderer;
    act(() => {
      component = renderer.create(<StarRating rating={2.5} count={10} />);
    });
    const tree = component!.toJSON();
    expect(tree).toBeTruthy();
  });
});
