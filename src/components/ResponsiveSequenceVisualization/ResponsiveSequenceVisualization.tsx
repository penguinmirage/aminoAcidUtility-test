import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getAminoAcidColor, getTextColor } from '../../utils/aminoAcidColors';

interface ResponsiveSequenceVisualizationProps {
  sequence1: string;
  sequence2: string;
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    padding: 8px;
    margin-top: 12px;
  }
`;

const SequenceContainer = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 12px;
  }

  @media (max-width: 480px) {
    padding: 8px;
  }

  @media (max-width: 320px) {
    padding: 6px;
  }
`;

const ChunkContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isLast',
})<{ isLast: boolean }>`
  margin-bottom: ${props => (props.isLast ? '0' : '24px')};
  border-bottom: ${props => (props.isLast ? 'none' : '1px solid #dee2e6')};
  padding-bottom: ${props => (props.isLast ? '0' : '16px')};

  @media (max-width: 768px) {
    margin-bottom: ${props => (props.isLast ? '0' : '16px')};
    padding-bottom: ${props => (props.isLast ? '0' : '12px')};
  }

  @media (max-width: 480px) {
    margin-bottom: ${props => (props.isLast ? '0' : '12px')};
    padding-bottom: ${props => (props.isLast ? '0' : '8px')};
  }
`;

const SequenceDisplay = styled.div`
  font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
  font-size: 16px;
  line-height: 2;
  letter-spacing: 1px;
  user-select: text;
  word-break: break-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 1.8;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    letter-spacing: 0.3px;
    line-height: 1.6;
  }

  @media (max-width: 320px) {
    font-size: 11px;
    letter-spacing: 0.2px;
    line-height: 1.5;
  }
`;

const SequenceRow = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 1px;

  @media (max-width: 480px) {
    margin-bottom: 6px;
    gap: 0.5px;
  }

  @media (max-width: 320px) {
    margin-bottom: 4px;
    gap: 0.5px;
  }
`;

const AminoAcid = styled.span.withConfig({
  shouldForwardProp: prop =>
    !['backgroundColor', 'textColor', 'isTransparent'].includes(prop),
})<{ backgroundColor: string; textColor: string; isTransparent: boolean }>`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.textColor};
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
  min-width: 16px;
  display: inline-block;
  text-align: center;
  border: ${props => (props.isTransparent ? '1px solid #e0e0e0' : 'none')};
  flex: 0 0 auto;

  @media (max-width: 768px) {
    padding: 2px 3px;
    min-width: 14px;
  }

  @media (max-width: 480px) {
    padding: 1px 2px;
    min-width: 12px;
    font-size: 11px;
  }

  @media (max-width: 320px) {
    padding: 1px 2px;
    min-width: 10px;
    font-size: 10px;
  }
`;

const PositionIndicator = styled.div`
  margin-top: 8px;
  font-size: 10px;
  color: #6b7280;
  font-family: monospace;
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    font-size: 9px;
    margin-top: 6px;
  }

  @media (max-width: 320px) {
    font-size: 8px;
    margin-top: 4px;
  }
`;

const LegendContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    margin-top: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 8px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const LegendColor = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'isGradient',
})<{ isGradient?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #ccc;
  flex-shrink: 0;

  ${props =>
    props.isGradient
      ? `
    background: linear-gradient(45deg, #67E4A6 25%, #FFEA00 25%, #FFEA00 50%, #FC9CAC 50%, #FC9CAC 75%, #BB99FF 75%);
  `
      : `
    background-color: #f0f0f0;
    border: 2px solid #dc2626;
  `}

  @media (max-width: 480px) {
    width: 14px;
    height: 14px;
  }

  @media (max-width: 320px) {
    width: 12px;
    height: 12px;
  }
`;

const LegendText = styled.span`
  font-size: 12px;
  color: #666;

  @media (max-width: 480px) {
    font-size: 11px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
  }
`;

const SequenceLength = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: auto;

  @media (max-width: 480px) {
    font-size: 11px;
    margin-left: 0;
    margin-top: 8px;
  }

  @media (max-width: 320px) {
    font-size: 10px;
  }
`;

const ResponsiveSequenceVisualization: React.FC<
  ResponsiveSequenceVisualizationProps
> = ({ sequence1, sequence2 }) => {
  const [chunkSize, setChunkSize] = useState(60);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateChunkSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let characterWidth = 20;

        if (containerWidth <= 320) {
          characterWidth = 12;
        } else if (containerWidth <= 480) {
          characterWidth = 14;
        } else if (containerWidth <= 768) {
          characterWidth = 16;
        }

        const padding = containerWidth <= 480 ? 16 : 32;
        const availableWidth = containerWidth - padding;
        const optimalChunkSize = Math.floor(availableWidth / characterWidth);

        let minChunkSize = 10;
        let maxChunkSize = 80;

        if (containerWidth <= 320) {
          minChunkSize = 8;
          maxChunkSize = 30;
        } else if (containerWidth <= 480) {
          minChunkSize = 10;
          maxChunkSize = 40;
        } else if (containerWidth <= 768) {
          minChunkSize = 15;
          maxChunkSize = 60;
        }

        const newChunkSize = Math.max(
          minChunkSize,
          Math.min(optimalChunkSize, maxChunkSize)
        );
        setChunkSize(newChunkSize);
      }
    };

    calculateChunkSize();

    const handleResize = () => {
      calculateChunkSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createChunks = (seq1: string, seq2: string) => {
    const chunks: Array<{ seq1: string; seq2: string }> = [];

    for (let i = 0; i < seq1.length; i += chunkSize) {
      chunks.push({
        seq1: seq1.slice(i, i + chunkSize),
        seq2: seq2.slice(i, i + chunkSize),
      });
    }

    return chunks;
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString();

    if (selectedText && selectedText.trim()) {
      const cleanText = selectedText.replace(/\s+/g, '').toUpperCase();

      if (cleanText.length > 0) {
        navigator.clipboard
          .writeText(cleanText)
          .then(() => {
            toast.success('Последовательность скопирована в буфер обмена!', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })
          .catch(() => {
            toast.error('Ошибка при копировании в буфер обмена');
          });
      }
    }
  };

  const renderColoredSequence = (
    sequence: string,
    isFirstSequence = true,
    comparisonSequence?: string
  ) =>
    sequence.split('').map((aminoAcid, index) => {
      let backgroundColor: string;
      if (isFirstSequence) {
        backgroundColor = getAminoAcidColor(aminoAcid);
      } else if (
        comparisonSequence &&
        aminoAcid !== comparisonSequence[index]
      ) {
        backgroundColor = getAminoAcidColor(aminoAcid);
      } else {
        backgroundColor = 'transparent';
      }

      const textColor = getTextColor(backgroundColor);
      const isTransparent = backgroundColor === 'transparent';

      return (
        <AminoAcid
          // eslint-disable-next-line react/no-array-index-key
          key={`${isFirstSequence ? 'seq1' : 'seq2'}-${index}-${aminoAcid}`}
          backgroundColor={backgroundColor}
          textColor={textColor}
          isTransparent={isTransparent}
        >
          {aminoAcid}
        </AminoAcid>
      );
    });

  const chunks = createChunks(sequence1, sequence2);

  return (
    <Container>
      <Typography
        variant='h6'
        gutterBottom
        sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
      >
        Визуализация выравнивания
      </Typography>

      <SequenceContainer ref={containerRef} onMouseUp={handleTextSelection}>
        {chunks.map((chunk, chunkIndex) => (
          <ChunkContainer
            // eslint-disable-next-line react/no-array-index-key
            key={`chunk-${chunkIndex}-${chunk.seq1.length}`}
            isLast={chunkIndex === chunks.length - 1}
          >
            <SequenceDisplay>
              <SequenceRow>
                {renderColoredSequence(chunk.seq1, true)}
              </SequenceRow>

              <SequenceRow>
                {renderColoredSequence(chunk.seq2, false, chunk.seq1)}
              </SequenceRow>
            </SequenceDisplay>

            <PositionIndicator>
              <span>{chunkIndex * chunkSize + 1}</span>
              <span>
                {Math.min((chunkIndex + 1) * chunkSize, sequence1.length)}
              </span>
            </PositionIndicator>
          </ChunkContainer>
        ))}
      </SequenceContainer>

      <LegendContainer>
        <LegendItem>
          <LegendColor isGradient />
          <LegendText>Последовательность 1 (цветовое кодирование)</LegendText>
        </LegendItem>

        <LegendItem>
          <LegendColor />
          <LegendText>Последовательность 2 (выделены различия)</LegendText>
        </LegendItem>

        <SequenceLength>Длина: {sequence1.length} аминокислот</SequenceLength>
      </LegendContainer>
    </Container>
  );
};

export { ResponsiveSequenceVisualization };
