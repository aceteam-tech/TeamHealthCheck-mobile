import React from 'react'
import {
    NoHealthCheckText,
    SprintSelect,
    TileOption,
    TileOptionWrapper,
    OptionsGrid,
    Title
} from './TilesSelect.styles'

export default ({ listOpen, openListFn, selectFn, options, selected, label }) => {
    if (listOpen) {
        return (
            <OptionsGrid>
                {
                    options.map((o, i) => (
                        <TileOptionWrapper index={i} key={i}>
                            <TileOption onPress={() => selectFn(o)} selected={o === selected}>
                                <NoHealthCheckText selected={o === selected}>
                                    #{o}
                                </NoHealthCheckText>
                            </TileOption>
                        </TileOptionWrapper>
                    ))
                }
            </OptionsGrid>
        )
    }
    return <SprintSelect onPress={openListFn}>
        <NoHealthCheckText>
            {label}
        </NoHealthCheckText>
    </SprintSelect>
}
