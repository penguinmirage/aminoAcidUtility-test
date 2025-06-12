import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import ResponsiveSequenceVisualization from "../ResponsiveSequenceVisualization";
import ColorLegend from "../ColorLegend";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  sequence1: string;
  sequence2: string;
}

const AMINO_ACIDS_PATTERN = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 32px 16px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 24px 12px;
  }

  @media (max-width: 480px) {
    padding: 16px 8px;
  }

  @media (max-width: 320px) {
    padding: 12px 6px;
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 32px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 24px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 320px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #333;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }

  @media (max-width: 320px) {
    font-size: 0.85rem;
  }
`;

const TextArea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 2px solid ${(props) => (props.hasError ? "#d32f2f" : "#e0e0e0")};
  border-radius: 8px;
  font-family: "Courier New", "Monaco", "Menlo", monospace;
  font-size: 14px;
  line-height: 1.4;
  text-transform: uppercase;
  resize: vertical;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#d32f2f" : "#1976d2")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError ? "rgba(211, 47, 47, 0.2)" : "rgba(25, 118, 210, 0.2)"};
  }

  &::placeholder {
    color: #999;
    text-transform: none;
  }

  @media (max-width: 768px) {
    min-height: 100px;
    padding: 10px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    min-height: 80px;
    padding: 8px;
    font-size: 12px;
  }

  @media (max-width: 320px) {
    min-height: 70px;
    padding: 6px;
    font-size: 11px;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

const SubmitButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  align-self: center;

  &:hover {
    background: #1565c0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.9rem;
    width: 100%;
  }

  @media (max-width: 320px) {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
`;

const InstructionContainer = styled.div`
  background: rgba(227, 242, 253, 0.9);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(144, 202, 249, 0.7);
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    padding: 14px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 16px;
  }

  @media (max-width: 320px) {
    padding: 10px;
    margin-top: 12px;
  }
`;

const InstructionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  color: #1976d2;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 6px;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
    margin-bottom: 4px;
  }
`;

const InstructionList = styled.div`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #555;

  div {
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.5;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    line-height: 1.4;
  }
`;

const SequenceAlignment: React.FC = () => {
  const [showVisualization, setShowVisualization] = useState(false);
  const [alignmentData, setAlignmentData] = useState<FormData | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      sequence1: "",
      sequence2: "",
    },
  });

  const watchedSequence1 = watch("sequence1");
  const watchedSequence2 = watch("sequence2");

  const validateSequence = (value: string) => {
    if (!value) {
      return "Поле обязательно для заполнения";
    }

    if (!AMINO_ACIDS_PATTERN.test(value)) {
      return "Последовательность может содержать только латинские буквы аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ -";
    }

    return true;
  };

  const validateLength = (value: string) => {
    const otherSequence =
      value === watchedSequence1 ? watchedSequence2 : watchedSequence1;

    if (otherSequence && value.length !== otherSequence.length) {
      return "Длина последовательностей должна быть одинаковой";
    }

    return true;
  };

  const onSubmit = (data: FormData) => {
    setAlignmentData(data);
    setShowVisualization(true);
  };

  return (
    <Container>
      <ToastContainer />

      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldContainer>
            <Label htmlFor="sequence1">
              Первая аминокислотная последовательность
            </Label>
            <Controller
              name="sequence1"
              control={control}
              rules={{
                validate: {
                  required: validateSequence,
                  length: validateLength,
                },
              }}
              render={({ field }) => (
                <>
                  <TextArea
                    {...field}
                    id="sequence1"
                    placeholder="Например: VLSPADKTNIKASWEKIGSHG"
                    hasError={!!errors.sequence1}
                  />
                  {errors.sequence1 && (
                    <ErrorMessage>{errors.sequence1.message}</ErrorMessage>
                  )}
                </>
              )}
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="sequence2">
              Вторая аминокислотная последовательность
            </Label>
            <Controller
              name="sequence2"
              control={control}
              rules={{
                validate: {
                  required: validateSequence,
                  length: validateLength,
                },
              }}
              render={({ field }) => (
                <>
                  <TextArea
                    {...field}
                    id="sequence2"
                    placeholder="Например: VLSPADKTNIKASWEKIGSHG"
                    hasError={!!errors.sequence2}
                  />
                  {errors.sequence2 && (
                    <ErrorMessage>{errors.sequence2.message}</ErrorMessage>
                  )}
                </>
              )}
            />
          </FieldContainer>

          <SubmitButton type="submit">Показать выравнивание</SubmitButton>
        </Form>

        {showVisualization && alignmentData && (
          <>
            <ColorLegend />
            <ResponsiveSequenceVisualization
              sequence1={alignmentData.sequence1.toUpperCase()}
              sequence2={alignmentData.sequence2.toUpperCase()}
            />
          </>
        )}
      </FormContainer>

      <InstructionContainer>
        <InstructionTitle>Инструкция:</InstructionTitle>
        <InstructionList>
          <div>
            1. Введите две аминокислотные последовательности одинаковой длины
          </div>
          <div>
            2. Используйте только буквы аминокислот: A, R, N, D, C, E, Q, G, H,
            I, L, K, M, F, P, S, T, W, Y, V и символ -
          </div>
          <div>3. Нажмите "Показать выравнивание" для визуализации</div>
          <div>
            4. Выделите мышкой часть последовательности для копирования в буфер
            обмена
          </div>
          <div>
            5. Используйте Ctrl+F (Cmd+F) для поиска по последовательности
          </div>
        </InstructionList>
      </InstructionContainer>
    </Container>
  );
};

export default SequenceAlignment;
