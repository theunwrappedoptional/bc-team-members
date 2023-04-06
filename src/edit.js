/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit( { attributes, setAttributes } ) {
	const { columns } = attributes;

	const onChangeColumns = ( newColumns ) => {
		setAttributes( { columns: newColumns } );
	};

	return (
		<div
			{ ...useBlockProps( {
				className: `has-${ columns }-columns`,
			} ) }
		>
			<InspectorControls>
				<PanelBody>
					<RangeControl
						label={ __( 'Columns', 'bc-team-members' ) }
						min={ 1 }
						max={ 6 }
						value={ columns }
						onChange={ onChangeColumns }
					/>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				allowedBlocks={ [ 'blocks-course/team-member' ] }
				orientation="horizontal"
				template={ [
					[ 'blocks-course/team-member' ],
					[ 'blocks-course/team-member' ],
					[ 'blocks-course/team-member' ],
				] }
			/>
		</div>
	);
}
