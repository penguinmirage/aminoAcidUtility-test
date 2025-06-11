import React from 'react';
import styled from 'styled-components';
import { getAminoAcidColor, getTextColor, aminoAcidGroups, aminoAcidGroupNames } from '../../utils/aminoAcidColors';

interface ColorLegendProps {
  compact?: boolean;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact: boolean }>`
  background: ${props => props.compact ? 'rgba(255, 255, 255, 0.1)' : 'rgba(250, 250, 250, 0.95)'};
  backdrop-filter: ${props => props.compact ? 'none' : 'blur(5px)'};
  border-radius: ${props => props.compact ? '0' : '8px'};
  box-shadow: ${props => props.compact ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.2)'};
  border: ${props => props.compact ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  padding: ${props => props.compact ? '8px' : '16px'};
  margin-bottom: ${props => props.compact ? '0' : '16px'};
  
  @media (max-width: 768px) {
    padding: ${props => props.compact ? '6px' : '12px'};
    margin-bottom: ${props => props.compact ? '0' : '12px'};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.compact ? '4px' : '8px'};
    margin-bottom: ${props => props.compact ? '0' : '8px'};
  }
`;

const Title = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact: boolean }>`
  font-weight: bold;
  font-size: ${props => props.compact ? '0.7rem' : '1.1rem'};
  margin-bottom: ${props => props.compact ? '8px' : '16px'};
  display: block;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: ${props => props.compact ? '0.65rem' : '1rem'};
    margin-bottom: ${props => props.compact ? '6px' : '12px'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.compact ? '0.6rem' : '0.9rem'};
    margin-bottom: ${props => props.compact ? '4px' : '8px'};
  }
`;

const ChipsContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'compact',
})<{ compact: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.compact ? '4px' : '8px'};
  margin-bottom: ${props => props.compact ? '0' : '16px'};
  
  ${props => props.compact && `
    flex-direction: column;
    gap: 4px;
  `}
  
  @media (max-width: 768px) {
    gap: ${props => props.compact ? '3px' : '6px'};
    margin-bottom: ${props => props.compact ? '0' : '12px'};
  }
  
  @media (max-width: 480px) {
    gap: ${props => props.compact ? '2px' : '4px'};
    margin-bottom: ${props => props.compact ? '0' : '8px'};
  }
`;

const CompactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 3px;
  }
  
  @media (max-width: 320px) {
    gap: 4px;
    margin-bottom: 2px;
  }
`;

const CompactColorBox = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor: string }>`
  width: 16px;
  height: 16px;
  background-color: ${props => props.backgroundColor};
  border-radius: 3px;
  border: 1px solid #ccc;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }
  
  @media (max-width: 320px) {
    width: 12px;
    height: 12px;
  }
`;

const CompactText = styled.span`
  font-size: 0.7rem;
  color: #666;
  
  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
  
  @media (max-width: 320px) {
    font-size: 0.6rem;
  }
`;

const Chip = styled.div.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'textColor', 'compact'].includes(prop),
})<{ backgroundColor: string; textColor: string; compact: boolean }>`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: ${props => props.compact ? '12px' : '16px'};
  padding: ${props => props.compact ? '4px 8px' : '6px 12px'};
  font-size: ${props => props.compact ? '0.7rem' : '0.75rem'};
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: ${props => props.compact ? '0.65rem' : '0.7rem'};
    padding: ${props => props.compact ? '3px 6px' : '5px 10px'};
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.compact ? '0.6rem' : '0.65rem'};
    padding: ${props => props.compact ? '2px 5px' : '4px 8px'};
  }
  
  @media (max-width: 320px) {
    font-size: ${props => props.compact ? '0.55rem' : '0.6rem'};
    padding: ${props => props.compact ? '2px 4px' : '3px 6px'};
  }
`;

const InfoSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background-color: rgba(227, 242, 253, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(144, 202, 249, 0.7);
  
  @media (max-width: 768px) {
    margin-top: 12px;
    padding: 12px;
  }
  
  @media (max-width: 480px) {
    margin-top: 8px;
    padding: 8px;
  }
`;

const InfoText = styled.div`
  font-style: italic;
  line-height: 1.4;
  color: #666;
  font-size: 0.875rem;
  
  strong {
    font-weight: bold;
    color: #333;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.2;
  }
`;

const ColorLegend: React.FC<ColorLegendProps> = ({ compact = false }) => {
  const renderLegendItem = (groupKey: string, acids: string[]) => {
    if (groupKey === 'gap') return null;
    
    const color = getAminoAcidColor(acids[0]);
    const textColor = getTextColor(color);
    const groupName = aminoAcidGroupNames[groupKey as keyof typeof aminoAcidGroupNames];
    
    if (compact) {
      return (
        <CompactItem key={groupKey}>
          <CompactColorBox backgroundColor={color} />
          <CompactText>
            {acids.join(', ')}
          </CompactText>
        </CompactItem>
      );
    }

    return (
      <Chip
        key={groupKey}
        backgroundColor={color}
        textColor={textColor}
        compact={compact}
      >
        {`${groupName} — ${acids.join(', ')}`}
      </Chip>
    );
  };

  if (compact) {
    return (
      <Container compact={compact}>
        <Title compact={compact}>
          Цветовая схема:
        </Title>
        <ChipsContainer compact={compact}>
          {Object.entries(aminoAcidGroups).map(([groupKey, acids]) =>
            renderLegendItem(groupKey, acids)
          )}
        </ChipsContainer>
      </Container>
    );
  }

  return (
    <Container compact={compact}>
      <Title compact={compact}>
        Цветовая схема выравнивания аминокислот
      </Title>
      
      <ChipsContainer compact={compact}>
        {Object.entries(aminoAcidGroups).map(([groupKey, acids]) =>
          renderLegendItem(groupKey, acids)
        )}
      </ChipsContainer>
      
      <InfoSection>
        <InfoText>
          <strong>Принцип окрашивания:</strong>
          <br />
          • В верхней строке каждая буква окрашена фоном в соответствии со свойствами аминокислот
          <br />
          • В нижней строке фоном выделены только буквы, отличающиеся от соответствующей по индексу буквы в строке выше
        </InfoText>
      </InfoSection>
    </Container>
  );
};

export default ColorLegend;